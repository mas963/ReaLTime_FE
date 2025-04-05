import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </ThemeProvider >
      </body>
    </html >
  );
}
