import Header from "@/components/shared/Header";
import Menubar from "@/components/shared/Menubar";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen  grid-rows-[60px_1fr] gap-2 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr_300px]">
      <Header />
      <Menubar />
      <main className="bg-green-500 max-lg:col-span-2 max-md:col-span-3">
        {children}
      </main>
      <Sidebar />
    </div>
  );
}
