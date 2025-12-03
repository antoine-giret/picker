export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col grow-1 items-center gap-6 pt-6 pb-24">{children}</div>;
}
