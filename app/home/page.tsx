import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <h1>Experiment demos:</h1>
      <a className=" hover:text-blue-500" href="/exp/2"> Knowledge graph, Experiment 2</a>
      <a className=" hover:text-blue-500" href="/chat">Chat page</a>
      <a className=" hover:text-blue-500" href="/completion">Completion page</a>
      <button className="btn hover:text-blue-500">
        <b><a href={"http://write." + process.env.NEXT_PUBLIC_ROOT_DOMAIN}>Read about my experiments here 💙</a></b>
      </button>
    </div>
  );
}
