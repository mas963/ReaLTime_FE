import {ThemeProvider} from "@/providers/theme-provider";
import "./globals.css";
import {NextAuthProvider} from "@/providers/NextAuthProvider";
import 'nprogress/nprogress.css';
import {ProgressBarProvider} from "@/providers/ProgressBarProvider";

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
        <ProgressBarProvider/>
        {children}
      </NextAuthProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
