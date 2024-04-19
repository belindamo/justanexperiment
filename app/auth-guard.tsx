"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LoadingCircle from "@/components/icons/loading-circle";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status: status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      if (status === 'authenticated' && session?.user && pathname === '/login') {
        router.replace('/');
        return;
      } else if (status === 'unauthenticated' && !session && pathname !== '/login') {
        router.replace('/login');
        return;
      }
      setValidating(false);
    }
  }, [pathname, router, session, status])


  if (status === 'loading' || validating) return (<div className="flex min-h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
    <LoadingCircle dimensions="h-10 w-10" />
  </div>);

  return <div>
    {children}
  </div>;
}
