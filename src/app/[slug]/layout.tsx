import { getThemeById } from "@/lib/themes";

export default function ProfileLayout({
  children,
  theme
}: {
  children: React.ReactNode;
  theme: string
}) {
  const themeData = getThemeById(theme);

  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col items-center
      justify-center">
        {children}
      </body>
    </html>
  );
}