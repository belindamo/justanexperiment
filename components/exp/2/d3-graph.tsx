import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Data structures
export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description?: string;

  // These populate through d3
  // index?: number;
  // x?: number;
  // y?: number;
  // vy?: number;
  // vx?: number;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  name?: string;

  // These populate thorugh d3
  // index?: number;
}

export interface GraphProps {
  nodes: Node[];
  links: Link[];
}

const ForceGraph: React.FC<GraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear SVG content on component update
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const g = svg.append("g"); // This group will contain all the graph elements

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Append a non-scalable border
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("vector-effect", "non-scaling-stroke"); // Keeps the stroke width constant

    // // Tooltip for node names
    // const tooltip = d3.select('body').append('div')
    //   .attr('class', 'tooltip')
    //   .style('position', 'absolute')
    //   .style('visibility', 'hidden')
    //   .style('background', 'lightgrey')
    //   .style('padding', '5px')
    //   .style('border-radius', '5px');

    // Force simulation setup
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => (d as Node).id)
          .distance(250),
      )
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Arrows
    g.append("defs")
      .selectAll("marker")
      .data(["end"]) // This can be a list if you have different types of markers
      .enter()
      .append("marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25) // Adjust this depending on the size of your nodes
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999"); // Color of the arrowhead

    // Create link elements
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", "#999")
      .style("stroke-width", 2)
      .attr("marker-end", "url(#end)");

    // Create node elements
    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20);

    const labels = g
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .style("fill", "grey");

    // Drag functionality
    const drag = d3
      .drag()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        //@ts-ignore
        d.fx = d.x;
        //@ts-ignore
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        //@ts-ignore
        d.fx = event.x;
        //@ts-ignore
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        //@ts-ignore
        d.fx = null;
        //@ts-ignore
        d.fy = null;
      });

    //@ts-ignore
    node.call(drag);

    // Zoom functionality
    const zoom = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    //@ts-ignore
    svg.call(zoom);

    // // Tooltip functionality
    node.on("mouseover", (event, d) => {
      // tooltip.html(d.name)
      //   .style("visibility", "visible");
      d3.select(event.currentTarget).style("cursor", "pointer");
    });
    //   .on("mousemove", (event) => {
    //     tooltip.style("top", (event.pageY - 10) + "px")
    //       .style("left", (event.pageX + 10) + "px");
    //   })
    //   .on("mouseout", () => {
    //     tooltip.style("visibility", "hidden")
    //   });

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        //@ts-ignore
        .attr("x1", (d) => (d.source as Node).x!)
        //@ts-ignore
        .attr("y1", (d) => (d.source as Node).y!)
        //@ts-ignore
        .attr("x2", (d) => (d.target as Node).x!)
        //@ts-ignore
        .attr("y2", (d) => (d.target as Node).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      labels
        //@ts-ignore
        .attr("x", (d) => d.x + 20)
        //@ts-ignore
        .attr("y", (d) => d.y - 10);
    });

    // return () => {
    // Cleanup the tooltip when component unmounts
    // tooltip.remove();
    // };
  }, [nodes, links]); // Redraw graph when data changes

  return <svg ref={svgRef} style={{ height: "100vh" }} />;
};

export default ForceGraph;
