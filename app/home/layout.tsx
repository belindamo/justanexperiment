import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {children}
      </main>
    </>
  );
}