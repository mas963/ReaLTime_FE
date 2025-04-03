import { Metadata } from "next";
import { getProfileData } from "./profileData";
import { getThemeById } from "@/lib/themes";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const profile = await getProfileData(params.slug);
  return {
    title: profile.name,
    description: profile.name
  };
}

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const profile = getProfileData(params.slug);
  if (!profile) {
    return notFound();
  }

  const theme = getThemeById(profile.theme);

  console.log("layout theme:::", theme);

  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}