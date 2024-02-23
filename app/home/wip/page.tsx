export default function WIP() {
  return (
    <>
      <h1>Work in progress</h1>
      <p>This page is not yet ready</p>
      <div className="flex h-screen flex-col items-center justify-center space-y-10 p-8">
        <div>Hi! Welcome to my site ^^</div>
        <div>Maybe a cute lil path...</div>
        {/* <div>
        You might want to check out the <InlineSnippet>Translate</InlineSnippet> page, the <InlineSnippet>Knowledge Graph</InlineSnippet> page, the <InlineSnippet>Chat</InlineSnippet> page, and the <InlineSnippet>Completion</InlineSnippet> page.
      </div> */}
        <div>Please make the most of this site with these:</div>
        <div>
          <ul>
            <li>Translate: Convert documents, etc.</li>
            <li>Knowledge Graph: Convert a document into a graph</li>
            <li>Chat: Chat with your personal documents securely</li>
            <li>Completion: Cute playground</li>
            <li>Agents: Do tasks for you like pay a parking ticket</li>
          </ul>
        </div>
        <div>
          {`You can also write who you are or what you'd like to use AI for. Then I can route you the right way ^^`}
        </div>
        <input placeholder="I am a 3rd year Computer Science student at University of Toronto." />
        <div>
          Experiments:
          {`Lastly, here's a long list of all the experiments I've done so far. (note to self: maybe this is in the header in home...) These are <i>very</i> messy and not at all to academic standards lol, but they're a good way to see what I've been up to.`}
        </div>
        <div>
          <ul>
            <li>exp 1</li>
            <li>exp 2</li>
            <li>exp 3</li>
          </ul>
        </div>
        <div>{`Writing: please feel free to browse my writing too! It's not very organized but I welcome any readers ^^`}</div>
        <div>FAQs</div>
        <div>
          <div>
            What is this site? --- I use AI a lot to help me with my studies and
            work. I also use it to help me write and think about things. ChatGPT
            has been really useful but still lacking in a lot of ways. So, I
            made this interface so that AI feels even more useful.
          </div>
          <div>
            {`How is this different from ChatGPT? ---
          1. This is a bit more opinionated towards the stuff that I've really enjoyed using ChatGPT for. 
          2. Also, you'll be able to access more AI models than just ChatGPT.
          3. We never store your local info. Our code is public so you can double check this yourself. We'll only pull info from your computer if you give us permission to do so.`}
          </div>
          <div>
            Can you tell me a bit more about how your data privacy works? ---
            Sure thing! We wrote it in more depth here, in simple everyday
            language.
          </div>
          <div>
            {`Why is this "Just an Experiment"? ---
          AI is improving so fast! So things here will also improve very quickly. `}
          </div>
        </div>
        <div>Enjoy ❤️</div>

        {/* <h1>Experiment demos:</h1>
      <a className=" hover:text-blue-500" href="/exp/2"> Knowledge graph, Experiment 2</a>
      <a className=" hover:text-blue-500" href="/chat">Chat page</a>
      <a className=" hover:text-blue-500" href="/completion">Completion page</a>
      <button className="btn hover:text-blue-500">
        <b><a href={"http://write." + process.env.NEXT_PUBLIC_ROOT_DOMAIN}>Read about my experiments here 💙</a></b>
      </button> */}
      </div>
    </>
  );
}
