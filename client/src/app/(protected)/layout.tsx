import SideMenu from "@/components/SideMenu";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
     <div className="h-screen w-full grid grid-cols-1 md:grid-cols-[200px_auto]">
      <SideMenu />
      <div></div>
        {children}
     </div>
    );
  }
  