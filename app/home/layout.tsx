import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">{children}</main>
    </>
  );
}
