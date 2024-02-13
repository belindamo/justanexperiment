'use client';

import { useState } from 'react';
import type { ChatCompletionCreateParams } from 'openai/resources/chat';
import ForceGraph, { Node, Link, GraphProps } from "@/components/experiments/d3-graph";
import example_data from './graph-data/ResNet_102_3-5.json';

// Constants
const TEST_STOP_LENGTH: number = 1000; // may go over a few
const TOTAL_STOP_LENGTH: number = 10000; // may go over a few
const EXAMPLE_FIRST_NODE: Node = {
  id: '0 - Science',
  name: "Science",
  description: "Science is a systematic process that builds and organizes knowledge in the form of testable explanations and predictions about the universe."
};
const EXAMPLE_GRAPH_DATA: GraphProps = example_data;

// Functions
const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'list_subconcepts',
    description: 'List 5-10 subconcepts and their descriptions, given a concept',
    parameters: {
      type: 'object',
      properties: {
        subconcepts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'the name of the subconcept'
              },
              description: {
                type: 'string',
                description: 'description of the subconcept'
              }
            }
          },
        }
      },
      required: ['subconcepts']
    },
  },
]

// Breadth-first Generation
async function generateKnowledgeTree(firstNode: Node) : Promise<GraphProps> {
  let nodes: Node[] = [ firstNode ];
  let links: Link[] = [];
  let interim_nodes: Node[] = [ firstNode ];
  
  try {

    // Create graphs
    while (nodes.length < TEST_STOP_LENGTH && interim_nodes.length > 0) {

      const n: Node = interim_nodes.shift()!;
      
      const response = await fetch("/api/functions", {
        method: "POST",
        headers: { "content-type": 'application/json'},
        body: JSON.stringify({ messages: [{
          role: 'user',
          content: `Name all key academic subconcepts of ${n.name}. (A subconcept X within concept Y is defined as follows: the set that represents X is a strict subset of the set that represents Y. Please follow this definition strictly)`
        }], functions }),
      });

      if (!response.ok) {
        throw new Error('POST response was not ok');
      }

      const data = await response.json();

      const message = data.choices[0].message;

      if (data.choices[0].finish_reason === "function_call" && message.function_call?.name === "list_subconcepts") { 
        const { subconcepts } = JSON.parse(message.function_call.arguments);

        for (const s of subconcepts) {
          const sNode : Node = { id: `${nodes.length} - ${s.name}`, ...s };
          interim_nodes.push(sNode);
          nodes.push(sNode);
          links.push({ source: n.id, target: sNode.id });
        }

        console.log('Updated nodes', nodes);
      
      } else { 
        throw new Error('Function "list_subconcepts" was not called');
      }
      

    }
    console.log({nodes, links});

    // Reconcile links
    // TODO later: check if there is an existing concept? 

  } catch(e) {
    console.error(`Error caught: ${e}`);
  }
  
  return {nodes, links} as GraphProps;

}


// DOM
export default function KnowledgeTree() {
  
  const [firstNode, setFirstNode] = useState('');
  const [graphData, setGraphData] = useState<GraphProps>(EXAMPLE_GRAPH_DATA);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNode(e.target.value);
  }

  return (
    <div className="flex flex-col w-full py-24 mx-auto stretch" style={{ maxWidth: '100vw', textAlign: 'center'}}>
      <h1>
        Knowledge Tree
      </h1>
      <p>
        Works best for academic concepts!
      </p>
      <div style={{ display: 'inline-block', textAlign: 'center' }}>
        <form
        className="grid gap-6 max-w-md"
        style={{ display: 'inline-block', textAlign: 'center' }}
        onSubmit={async (e) => {
          e.preventDefault();
          const node = firstNode === '' ? EXAMPLE_FIRST_NODE : { id: `0 - ${firstNode}`, name: firstNode } as Node;
          const graph = await generateKnowledgeTree(node);
          setGraphData(graph);
        }}
        >      
          <input type="text" name="name" value={firstNode} placeholder="Your starting concept" onChange={handleInputChange} 
          className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 my-4"/>
          <button 
          type="submit"
          className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800 my-4"
          >
            Generate Knowledge Tree
            </button>
        </form>
      </div>
      <ForceGraph nodes={JSON.parse(JSON.stringify(graphData.nodes))} links={JSON.parse(JSON.stringify(graphData.links))}/>
      <p className="my-4">Graph data: </p>
      <p>{JSON.stringify(graphData)}</p>
    </div>
  );
}
