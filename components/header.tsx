'use client';

import { NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuList, NavigationMenu, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { options } from "@/lib/experiments";

const models = [
  'GPT-4',
  'GPT-3.5-turbo'
]

const whoAreYou = [
  'Student',
  'Techie Researcher',
  'Non-Techie Researcher',
  'Writer',
  'Input your own',
  `I'm not sure yet 🙈 help me!`,
  '(Selecting this will help customize your experience ^^)'
]

export default function Header() {
  const currentUrl = usePathname();

  return (
  <header className="flex justify-between w-full">
    <div className="flex flex-row">
      <NavigationMenu className="my-4 mx-2" alignMenu="left">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div>
                Who are you?
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] p-2">
                {whoAreYou.map((who, i) => (
                <NavigationMenuLink asChild key={`who-${i}`}>
                  <Link
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    href="#"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">{who}</div>
                  </Link>
                </NavigationMenuLink>
                ))}  
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <NavigationMenu className="my-4 mx-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
            <img src="/logo.png" alt="Just an Experiment" className="h-6 w-auto pr-2" />
            <Label className="hidden md:block"> 
            { currentUrl === '/' ? (
              "Try out some experiments!"
            ): currentUrl === '/what' ? (
              "About us"
            ): (
              "JaE | " + options.find(option => option.href === currentUrl)?.title
            )}
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
                    <div className="text-sm font-medium leading-none group-hover:underline">{option.title}</div>
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
    {/* <Link href="/" className="flex items-center py-4 px-8">
      <img src="/logo.png" alt="Just an Experiment" className="h-6 w-auto pr-2" />
      <Label className="hidden md:block">JaE {currentUrl !== '/' && ( " | " + options.find(option => option.href === currentUrl)?.title )} </Label>
    </Link> */}
    <div className="flex flex-row">
      <Link href="/what" className="flex items-center py-4">
        <HelpCircle className="h-4" />
      </Link>
      <NavigationMenu className="my-4 mr-2"
      alignMenu="right">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div>
                {models[0]}
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] p-2">
                {models.map((model, i) => (
                <NavigationMenuLink asChild key={`model-${i}-${model}`}>
                  <Link
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    href="#"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">{model}</div>
                  </Link>
                </NavigationMenuLink>
                ))}  
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>
  )
}