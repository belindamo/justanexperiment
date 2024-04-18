"use client";
import { useSession, signOut } from "next-auth/react"

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { LogOut, Settings, HelpCircle, Github } from "lucide-react";
import GithubSvg from '@/components/icons/github';
import Google from '@/components/icons/google';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession()

  const logout = async () => {
    await signOut();
    router.replace('/login');
  }

  return (session?.user &&
    <div className="flex w-full items-center justify-between mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={
              session?.user?.image ??
              `https://avatar.vercel.sh/${session?.user?.email}`
            }
            width={40}
            height={40}
            alt={session?.user?.name ?? "User avatar"}
            className="h-6 w-6 rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex">
              <span className="mr-2">
                {(session?.user as any).provider === 'github' && <GithubSvg className="mr-2 h-5 w-4" />}
                {(session?.user as any).provider === 'google' && <Google className="mr-2 h-5 w-4" />}
              </span>
              {session?.user.name}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings width={16} className="mr-2 h-4 w-4" />
              <span>Configure keys</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="https://write.justanexperiment.com" target="_blank" className="flex">
                <HelpCircle width={16} className="mr-2 h-4 w-4" />
                <span>About us</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="https://write.justanexperiment.com" target="_blank" className="flex">
                <Github width={16} className="mr-2 h-4 w-4" />
                <span>Github</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut width={16} className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
