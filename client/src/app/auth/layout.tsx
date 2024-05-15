export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
   <section className="w-full">
    <div className="h-screen px-4 flex items-center justify-center">
      {children}
    </div>
   </section>
  );
}
