import CategoryFilter from "@/components/shared/CategoryFilter";
import Header from "@/components/shared/Header";
import Menubar from "@/components/shared/Menubar";
import Search from "@/components/shared/Search";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper grid min-h-screen grid-rows-[auto_1fr] gap-x-8 gap-y-2 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
      <Header />
      <Menubar />
      <main className="space-y-8 py-4 max-lg:col-span-2 max-md:col-span-3">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <Search />
          <CategoryFilter />
        </section>
        {children}
      </main>
      <Sidebar />
    </div>
  );
}
