import { FileTextIcon, FlaskRound, FlaskConical } from "lucide-react";
import { BotIcon } from "lucide-react";
import { Template } from "./types";

export const TEMPLATES: Template[] = [
  { title: "Markdown note", format: "markdown" },
  { title: "Tweet", format: "string" },
  { title: "Documentation page", format: "markdown" },
  { title: "Simple HTML landing page", format: "html" },
  { title: "Research markdown", format: "string" },
  { title: "Research proposal", format: "string" },
  { title: "Literature review", format: "string" },
  { title: "Marketing copy", format: "string" },
  { title: "Product description", format: "string" },
  { title: "Instagram caption post", format: "string" },
  { title: "English", format: "string" },
  { title: "Spanish", format: "string" },
  { title: "Chinese", format: "string" },
  { title: "Spanish as spoken locally in Mexico", format: "string" },
  { title: "Grammatical standard English", format: "string" },
  { title: "Expand", format: "string" },
  { title: "Shorten", format: "string" },
  {
    title: "Frontmatter for experiments",
    icon: FileTextIcon,
    audience: "self",
    format: "yaml",
    sampleTexts: [
      {
        text: `---
      tags:
        - building-block
        - joy
        - internal-experiment
      type:
        - mvp-task-code
      claim type:
        - ∃ x
      theme:
        - knowledge-work
      est. time: 2 hours
      actual time: 20 hours
      problem: I want to be able to understand the landscape of scientific knowledge based on how concepts are connected to one another, but I can't find a graph that I like that maps out these concepts. I'd want this graph to show the widest landscape of science, but also be able to zoom into specific areas.
      bit: Existing pre-LLM solutions like Freebase seem to be human-reviewed or pulled from structured data like website trees, whereas existing generative solutions
      flip: This graph will be generated using LLM and recursively, using the LLM as the "expert"
      instantiate solution: I introduce Knowledge Tree, a graph of scientific knowledge that uses a mixture of LLMs to automatically generate nodes recursively and reconcile edges. This first version does not use any external data, but rather relies on prompts to pull knowledge from the LLMs themself.
      method: We'll be using GPT-4 as the base model and Functions API to rely on getting JSON format data. We'll be using a simple GPT-4, Next.js, Typescript stack. We'll use D3.js to visualize the graph.  More on method below
      evaluation: Evaluation-wise, I'm going to use my own intuition based on clicking around the graph, and get my friend who has a PhD in Statistics and works in AI, to look at that sub-graph area. We will each rate from 1-10 to compare how the output was compared to if the person spent a day creating the graph themself.
      implications: The hope is that I can continue making more experiments on this thread. I'd like to eventually be able to get any type of unstructured text and be able to convert it into a useful knowledge graph that can be used for spaced repetition and updates over time. This is being added as a leaf to my [[12 problems tree]]! This can even be used to extract any kind of explainable structure from LLMs over time
      related works: Wikigraphs, Freebase
      eval plan: |-
        DV: graph quality of connections
        IV: generative model instead of human experts to create graph
        Task: Build graph. 
        Threats: A caveat is I didn't feel like doing a strict lit review of the massive literature on knowledge graphs so I only looked for like 10 min into other generated knowledge graph tools because I just wanted to try building it first. But from what I observed, it looks like in industry/academia, "knowledge graph" is a loosely used term to mean anything from bullet point notes (Taskade) to graph neural nets. In any case, it looked much too complicated to look through everything, so I'm just going to build. I'll probably be doing more experiments on this anyways
      findings: |-
        I ended up revising the scope of this experiment since it was getting long - I worked on it over 4 days! I generated many graphs from about 10 to 1000 nodes in size. I also got impatient with GPT-4 because it was so slow lol, so I generated with either GPT-4 or GPT-3.5. GPT 3.5 for smaller graphs, 10-100:  Knowledge graph, ResNet, Artificial intelligence, Science. GPT 4 for the big graph I wanted to build well with ~1000 nodes: Science. 
        I think the graph certainly was good one or two layers deep, but the deeper it went it started pulling out concepts that I wouldn't classify as "official" concepts. For example, I made a graph cheekily about "knowledge graphs", and then one of the items was "edges" and a child node of that was "edge coloring", which seemed unsubstantial. Next part of this experiment, I would add back in the plan to have a second function call to go over the entire graph and double check with a question to an LLM that a concept is actually an established subconcept of its parent.
        Another problem was that it would repeat back concepts, either repeating the same exact term, a similar term, or a parent term. This seems like it could also be solved with a function calling question to re-verify.
        I'd rate the "knowledge graph" one a solid 6. It was a good attempt but a few layers down, it really started struggling/
        My friend rated the "artificial intelligence" graph as X. I generated another one for "ResNet", or Residual Networks, which is a machine learning concept usually used in image recognition. HE rated that one a Y.
      pass/fail?: Pass! I was able to get a pretty cool glimpse of what the graph looks like :) There is definitely room for improvement but I think it's a great base to keep adding functionality to manipulate these graphs and make them more useful over time.
      what did I learn?: |-
        On the meta-learning side, I grossly underestimated how long these things take to build lol. 10x difference! That's wild. The 20 hours is an estimate but I thought it would take 2 hours, but then got sucked into a lot of different things that I ended up learning. I learned a lot more about Vercel's ecosystem. Specifically, I relied heavily on their Vercel 'ai' module to call OpenAI's API. I also learned how to use OpenAI's function calling API. I also played around with D3 alongside React/Next.js for half of a day, which ended up being a lot of wrangling. I found that LLMs are great for writing up visual code such as D3 or CSS. This might be more on me because it takes me a long time to learn it but still - it was quite helpful! 
        Other learnings...
        GPT-4 is kinda great. I just plug in my proposal information and then it spits out code. fun! 
        Also, learned how much work it is to maintain an open source repository. Even Vercel's Platforms repo hasn't been updated in so long, it's still using this outdated 3rd party openai package, openai-edge...which hasn't been updated in 6 mths and is now redundant by their own acknowledge, as of July 2023.
        Also, refactoring an existing codebase takes work...it's part of the overhead of using a template, I suppose. I still think the template is better than not, when it is written well.
      dependency experiments: 
      true statements:
      ---`,
      },
    ],
  },
  {
    title: "Experiment writeup for others",
    icon: FlaskConical,
    format: "markdown",
    audience: "technical",
    sampleTexts: [
      {
        text: `## **Experiment Length:**

      **Estimated Time:** 2 hours  
      **Actual Time:** 20 hours
      
      ## **Summary:**
      
      In a quest to understand scientific knowledge and how concepts interconnect, I embarked on creating a comprehensive knowledge graph of scientific concepts, showcasing the broad and intricate landscape of science. I named it "Knowledge Tree," a recursive, LLM-generated graph that doesn't rely on external data, but on the knowledge embedded within GPT-4 itself.
      
      Distinct from traditional human-curated databases like [Freebase ↗](https://en.wikipedia.org/wiki/Freebase_(database)), Knowledge Tree is intended to portray the expansive landscape of science, enabling users to explore from general themes to specific details. The core idea is to instantiate a solution where the knowledge graph would be generated recursively by GPT-4, without any external data inputs.
      
      Drawing inspiration from projects like Wikigraphs and Freebase, this graph aims to transform unstructured text into a structured, useful knowledge repository, potentially beneficial for a person to learn concepts alongside a combination of LLMs and spaced repetition. The implications of this experiment are far-reaching, potentially allowing the transformation of any unstructured text into a valuable, updateable knowledge graph. This aligns with my broader goal of creating tools for better information retention and understanding, adding a new dimension to my ongoing exploration in the field of knowledge management.
      
      **Big 1006-node graph, Science:**
      
      ![[k__TRaHkwQGgtWy_Qz055.png]]]
      
      ## **Plan:**
      
      The method involved utilizing GPT-4 with a JSON format output using their [Function Calling API ↗](https://platform.openai.com/docs/guides/function-calling), integrating technologies like Next.js, Typescript, and D3.js for visualization. The goal was to create a dynamic, visual representation of scientific knowledge, starting from broad categories and delving deeper into specific subfields.
      
      The process started with defining a base model in GPT-4 and structuring the requests to receive JSON formatted data. The key was to generate a graph that could dynamically display the interconnectedness of scientific concepts, starting from broad categories and progressively revealing their subfields.
      
      The process was roughly as follows:
      
      - **Symbol Identification:** Each node in the graph represented a scientific concept or subfield.
      - **Recursive Generation:** Continuously generated subfields until all possibilities were explored.
      - **Graph Size:** Graph size is roughly 100-1000 nodes for this first version.
      - **Prompt Construction:** Focused on eliciting key academic subconcepts and adjacent fields in science, ensuring minimal overlap and clear hierarchical relationships.
          - For getting subconcepts: _Name all key academic subconcepts of X. (A subconcept X within concept Y is defined as follows: the set that represents X is a strict subset of the set that represents Y. Please follow this definition strictly)_
      - **Duplication Management:** Employed a verification process to identify and reconcile duplicate concepts. (Didn't have a chance to implement for this experiment)
      
      The graph's quality was to be evaluated based on two people's qualitative evaluations:
      
      1. My own assessment of the graph's accuracy and depth
      2. A domain expert assessment by a friend with significant expertise in Statistics and AI.
      
      Each of us would rate the graph on a scale of 1-10, comparing it to a graph that we might have created ourselves in a day.
      
      **Science > Biology > Ecology subgraph:**
      
      ![[SADo5nZJd_SqkpHrbTx_B.png]]
      
      ## **Result: 🟢 Pass**
      
      Overall, the experiment was a success! Despite some shortcomings, it offered a fascinating glimpse into what a recursively generated knowledge graph could look like. There's undoubtedly room for improvement, but as a foundational step, it establishes a solid base for more useful knowledge graph manipulations over time.
      
      Over the course of four days, the experiment evolved significantly. I found myself adjusting the scope as the project extended beyond the initial timeframe. Numerous graphs were generated, varying in size from 10 to about 1000 nodes. To manage the process more efficiently, I alternated between using GPT-4 and GPT-3.5, depending on the size and complexity of the graph. For smaller graphs (10-100 nodes), such as those on knowledge graphs, ResNet, and artificial intelligence, I utilized GPT-3.5. For the larger, more comprehensive graph centered around the broad theme of 'Science', which had approximately 1000 nodes, I employed GPT-4.
      
      The findings were intriguing but mixed. The graphs maintained a high level of accuracy and relevance within the first one or two layers. However, as the depth increased, the reliability of the connections began to wane. For instance, in a graph themed around 'knowledge graphs', the presence of concepts like 'edge coloring' under 'edges' appeared somewhat tangential and not entirely central to the main theme. This highlighted the need for a more robust validation process in future iterations, possibly involving a second function call to re-verify the authenticity and relevance of each concept as a subconcept of its parent.
      
      **Example of listing a not very important concept, Knowledge Graph > Graph Theory > Edge > Edge Coloring:**
      
      ![[_hyDyX_23MExH9k9Sb70g.png]]
      Another challenge encountered was the repetition of concepts. The graphs occasionally repeated the same term, used similar terms, or circled back to parent terms. This issue, too, seems addressable with a more thorough verification process.
      
      **Example of concepts looping back into themselves, Knowledge graph > Ontology > Domain Ontology > Ontology:**
      
      ![[Y2_RIMuFUUSMDyfMJSGJd.png]]
      **My personal rating for the graph of "Knowledge graph" was a 5 (7 is what I would've created, 10 is an expert)**.
      
      My friend, an expert in AI, provided ratings for the specific graphs such as 'Artificial Intelligence' and 'ResNet' (Residual Networks), a concept in machine learning.
      
      Here is a summary of what they said
      
      - **For the graph of "Artificial intelligence", from a scale of 1 to 10 (8 is what he would have created, 10 is Andrew Ng), he rated the quality of the graph a 6**
      - **For the graph of "Resnet", from a scale of 1 to 10 (7 is what he would've created, 10 is the author of Resnet ), he rated the quality of the graph a 4**
      - A recommended change was to add additional layers between certain concepts that weren't there.
      - Another change was to prevent edges from being ordered the wrong way. All directed edges should point towards the subconcept. "70% of the ResNet graph is upside down"
          - ex: Deep Learning->ResNet, not the other way around. And there would probably also be additional concept layers between the two.
      - Another change is making it a directed graph not just a tree, so nodes would link to each other. There may even be recursive loops.
      
      **Graph, ResNet:**
      
      ![[vzZCqz7Z6VUnsf5j3TwOs.png]]
      
      ### **What I Learned:**
      
      The journey through this project was an eye-opener in terms of time management and the depth of learning involved in such an endeavor. Initially, I anticipated the project would take around 2 hours, but it expanded to an estimated 20 hours. This deviation was mainly due to the diverse range of technologies and concepts I engaged with during the project.
      
      One of the key areas of learning was the Vercel ecosystem. I extensively used Vercel's 'ai' module to interact with OpenAI's API, which was a big aspect of the project.
      
      Additionally, I explored the use of OpenAI's function calling API. This exploration was not just about understanding the API but also about applying it effectively in the context of the project. The integration of D3 with React/Next.js was another significant learning curve. While it involved a fair bit of complexity and wrangling, it was a rewarding experience, especially in understanding how LLMs can aid in writing visual code like D3 or CSS. This was particularly useful given my personal pace of learning these technologies.
      
      Another important realization was the effort required to maintain an open-source repository. Observing the status of Vercel's Platforms repository, which had not been updated for a while and was still using an outdated third-party OpenAI package, I recognized the challenges and responsibilities associated with open-source maintenance.
      
      Lastly, I realized that GPT-4 is _really good_ for debugging CSS and data visualization code such as that of D3.js. D3.js has frustratingly obscure documentation, and I eventually just relied on GPT-4 to tell me how to write my D3.js graph in Next.js.
      
      Overall, this was a really fun project where I learned a lot :)
      
      ---
      
      _This blog post was generated by combining my messy notes with ChatGPT ;) The title image was generated using Midjourney with the blog post title as the prompt._`,
      },
    ],
  },
];
