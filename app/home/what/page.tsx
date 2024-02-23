import { InlineSnippet } from "@/components/form/domain-configuration";

export default function What() {
  return (
    <div>
    {`
    Thank you for visiting our website ☺️ ❤️

    # How it works: 
    - You can use this site to do a lot of things. These are called <InlineSnippet>tasks</InlineSnippet>. 
      - Example: Draft an email
    - You can also use this site to learn about AI and how it works. These are <InlineSnippet>experiments</InlineSnippet>.
      - Example: [[What is GPT?]]
    - You can also use this site to write and think about things. These are <InlineSnippet>reflections</InlineSnippet>.
      - Example: Write a reflection on your day
    - Lastly, you can link up your information here with other sites. These are called <InlineSnippet>integrations</InlineSnippet>.

   # The nitty gritty
   - Your data is stored on your computer's file system by default. [[Currently, it's connected to folder [[this folder]].]]
   - Your data is stored by default in markdown format.
   - You can also store your data in other formats like JSON, YAML, TOML, CSV, TSV, XML, etc.
   - This means you'll need to keep track of your data and its security by yourself. 
   - Why do we do this? Because we believe you should own your own data.

   # How do we keep you safe?
    - We don't store your personal data.
    - Our website is open source. Anyone can check the code to see that we're not doing anything sneaky. [[link]]
    - We only use your data to run the tasks you ask us to do. We don't use it for anything else.

    # What you should know:
    - This site is just an experiment. AI is moving fast so you may see things change quickly. [[Subscribe here]] to keep up to date.

    # FAQs
    - Who are you?? hiya
    - 
    `}
    </div>
  );
}