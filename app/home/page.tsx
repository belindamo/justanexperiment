import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <h1>
        <a href={"http://my." + process.env.NEXT_PUBLIC_ROOT_DOMAIN}>Click here to read about experiments 💙</a>
      </h1>
    </div>
  );
}
