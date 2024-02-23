import { InlineSnippet } from "@/components/form/domain-configuration";
import Link from "next/link";
import EnterPhoneNumber from "@/components/home/enter-phone-number";
import { Siren, Globe2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-16 py-8 text-center">
      <br />
      <div>Want to make your life a bit easier? 🧚🏼‍♀️</div>
      <br />
      <p className="max-w-screen-sm">
        Hiya! Every week I&apos;ll drop a new AI-based project that will
        hopefully save you time.
      </p>
      <br />
      <p>
        All tasks are run with your own API keys and local files, so your
        personal data is in your hands!
      </p>
      <br />
      <div className="m-2 flex flex-row">
        <Input
          placeholder="Enter your OpenAI API Key"
          className="mr-2 min-w-96"
        />
        <Button>Try</Button>
      </div>
      <small className="text-sm italic">
        <Link
          href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key"
          target="_blank"
          className="font-medium underline underline-offset-4"
        >
          How to get API key.
        </Link>
        Your keys and personal information will be stored locally
      </small>
      <br />
      <div>ABOUT</div>
      {/* <Link href="/what" className="font-medium text-primary underline underline-offset-4">Getting started</Link> */}
      <Link
        href="https://write.justanexperiment.com"
        className="font-medium text-primary underline underline-offset-4"
        target="_blank"
      >
        Philosophy ish
      </Link>
      <Link
        href="https://github.com/justanexperiment/justanexperiment"
        className="font-medium text-primary underline underline-offset-4"
        target="_blank"
      >
        Source code
      </Link>
      <br />
      <br />
      {/* BELOW IS LOTS OF PAST STUFF */}
      {/* IDEA -- add like little demo videos */}
      {/* <Alert className="max-w-screen-sm">
        <Siren className="h-4 w-4" />
        <AlertTitle>First drop is releasing XXX</AlertTitle>
        <AlertDescription>
          <div>
            Link 👉🏼 
            <Link href="/translate" className="hover:font-medium text-primary underline underline-offset-4">Translate between any Two Contexts</Link>
          </div>
        </AlertDescription>
      </Alert> */}
      {/* <p>👾✨👾✨👾 SIGN UP FOR DROPS 👾✨👾✨👾</p>
      <br />
      <EnterPhoneNumber />
      <br /> */}
      {/* <div>Examples of projects:</div>
      <ul>
        <li>Take an idea and convert it into a working project</li>
      </ul> */}
      {/* <div>PAST DROPS</div>
        <Link href="/translate" className="flex flex-row font-medium text-primary underline underline-offset-4">
          <Globe2 className="px-1" /> 
          Translate
        </Link> */}
      {/* <Link href="/what" className="font-medium text-primary underline underline-offset-4">How to add my own API keys, and why</Link> */}
    </div>
  );
}
