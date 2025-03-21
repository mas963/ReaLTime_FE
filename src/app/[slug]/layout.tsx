export const metadata = {
  title: "ReaLTime",
  description: "Receive notifications in ReaLTime",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}