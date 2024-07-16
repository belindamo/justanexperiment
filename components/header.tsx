"use client";

import {
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import UserSettings from "./app/user-settings";
import { useModelStorageContext } from "./providers/model-storage";
import { SingleSelect } from "@/app/home/translate/components/single-select";

export const options = [
  {
    title: 'Translate',
    href: '/translate',
    description: `Translation across more than just languages 🧙🏻‍♀️`,
  },
  {
    title: 'Chat',
    href: '/chat',
    description: 'Chat with AI characters that help you get things done',
  },
  {
    title: 'Converse',
    href: '/convo',
    description: 'Converse with an AI!'
  },
  { title: 'Graph', href: '/graph', description: 'Explore a concept graph on a topic of your choice.' },
  // { title: 'Concept Graph', href: '/graph', description: 'Explore a concept graph on a topic of your choice.' },
  // { title: 'RAG', href: '/rag', description: 'Chat with your documents' },
  // { title: 'Learn', href: '/learn', description: 'Use AI to help you learn more effectively' },
];

// const whoAreYou = [
//   "Student",
//   "Techie Researcher",
//   "Non-Techie Researcher",
//   "Writer",
//   "Input your own",
//   `I'm not sure yet 🙈 help me!`,
//   "(Selecting this will help customize your experience when this is done ^^)",
// ];

export default function Header() {
  const currentUrl = usePathname();
  const { enabledModels, selectedModel, setSelectedModel } = useModelStorageContext();

  return (
    <header className="flex w-full justify-between items-center relative py-2">
      <div className="flex flex-row">
        <Link href="/" className="sm:block mx-8 font-medium text-primary">
          🧚🏼‍♀️ JaE
        </Link>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu className="mx-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {/* <Image
                  src="/logo.png"
                  width={30}
                  height={30}
                  alt="Just an Experiment"
                  className="h-6 w-auto pr-2"
                /> */}
                <Label className="sm:block">
                  {currentUrl === "/"
                    ? "AI Tools"
                    : options.find((option) => option.href === currentUrl)
                      ?.title}
                </Label>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] p-2">
                  {options.map((option, i) => (
                    <NavigationMenuLink asChild key={`option-${i}`}>
                      <Link
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                        href={option.href}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          {option.title}
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                          {option.description}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row justify-end items-center">
        <UserSettings />
        <SingleSelect
          className="mr-6 w-[150px]"
          title="Select model..."
          options={enabledModels}
          selectedOption={selectedModel}
          setSelectedOption={(selectedOption) => {
            setSelectedModel(selectedOption);
          }}
        />
      </div>
    </header>
  );
}
