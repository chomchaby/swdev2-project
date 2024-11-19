export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[72px] bg-neutral-white grid grid-cols-[0%,1fr,0%] md:grid-cols-[10%,1fr,10%] xl:grid-cols-[15%,1fr,15%] px-4 mb-24">
      <div></div>
      {children}
      <div></div>
    </div>
  );
}
