import { ReactNode, Suspense } from "react";
import Profile from "@/components/app/profile";
import Nav from "@/components/app/nav";
import Header from "@/components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">
        {children}</div>
    </div>
  );
}
