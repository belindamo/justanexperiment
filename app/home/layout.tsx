import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <main className="flex flex-col w-screen h-screen overflow-auto">{children}</main>
    </div>
  );
}
