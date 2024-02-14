import { NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Settings,
} from "lucide-react";

const options = [
  { title: 'Translate', href: '/translate', description: 'Translate text from one type to another. Export it to your area of choice!' },
  { title: 'Knowledge Graph', href: '/kg', description: 'Explore a knowledge graph on a topic of your choice.' },
  { title: 'RAG', href: '/rag', description: 'Chat with your documents' },
  { title: 'Agents', href: '/agents', description: 'Create and manage little AI models to do your work for you!' },
  // { title: 'Learn', href: '/learn', description: 'Use AI to help you learn more effectively' },
]
export default function Header() {
  return (
  <div className="flex justify-between">
    <Link href="/" className="flex items-center py-4 px-8">
      <img src="/logo.png" alt="Just an Experiment" className="h-6 w-auto pr-2" />
      <Label>Just an Experiment</Label>
    </Link>
    <NavigationMenu className="py-4 px-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Translate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] p-2">
              {options.map((option) => (
              <NavigationMenuLink asChild>
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
    <NavigationMenu className="py-4 px-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="#"
          >
            About this experiment
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          href="#">
            <Settings />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

  </div>
  )
}