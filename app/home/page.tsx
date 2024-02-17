import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 text-center">
      <p>Do you want to spend more quality time with the people you love and less time doing boring work?</p>
      <br />
      <p>Every week we&apos;ll drop a task that will save you time. Once you log in, the tasks are run with your own API keys, so your personal data is in your hands!</p>
      <br />
      <p>First drop is out!! 👉🏼 <Link href="/translate"><b>Translate between any two contexts</b></Link></p>
      {/* Time is the one constant in every person&apos;s life. Let&apos;s make the most of it 💛 */}
      <br />
      <Link href="/what">Click here to learn: where do I start?</Link>
    </div>
  );
}
