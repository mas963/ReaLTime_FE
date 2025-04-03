import Image from "next/image";
import { getProfileData } from "./profileData";
import NotificationCard from "@/components/profile/NotificationCard";
import { Bell, Ellipsis } from "lucide-react";
import { notFound } from "next/navigation";
import { getThemeById } from "@/lib/themes";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: { slug: string };
};

const fetchProfile = cache(async (slug: string) => {
  return await getProfileData(slug);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchProfile(params.slug);
  return {
    title: profile.name,
    description: profile.name,
    openGraph: {
      title: profile.name,
      description: profile.name,
      images: profile.avatar ? [{ url: profile.avatar, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function UserPage({ params }: Props) {
  const profile = await fetchProfile(params.slug);
  const theme = getThemeById(profile.theme);

  console.log("theme:::", theme);

  if (!profile) {
    return notFound();
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center 
    ${theme.colors.body.background} ${theme.colors.body.text}`}>
      <div className="container mx-auto px-4 py-6 max-w-md md:max-w-xl lg:max-w-2xl">
        {/* Header Section with Responsive Layout */}
        <div className="flex items-center justify-around mb-6">
          <button className={`${theme.colors.primary} hover:${theme.colors.secondary} w-10 h-10 md:w-12 md:h-12 
           rounded-full flex items-center justify-center cursor-pointer`}>
            <Bell className={`${theme.colors.textPrimary} w-5 h-5 md:w-6 md:h-6`} />
          </button>

          <Image
            src={profile.avatar}
            width={120}
            height={120}
            className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
            alt="Avatar"
          />

          <button className={`${theme.colors.primary} hover:${theme.colors.secondary} w-10 h-10 md:w-12 md:h-12
           rounded-full flex items-center justify-center cursor-pointer`}>
            <Ellipsis className={`${theme.colors.textPrimary} w-5 h-5 md:w-6 md:h-6`} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="text-center mb-6">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{profile.name}</h1>
          <p className={`${theme.colors.textSecondary} text-sm md:text-base mt-2`}>{profile.bio}</p>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          {profile.notifications.map((notification: any) => (
            <NotificationCard
              key={notification.id}
              icon={notification.icon}
              title={notification.title}
              description={notification.description}
              link={notification.link}
              date={notification.date}
              theme={theme.colors.notificationCard}
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className={`${theme.colors.textSecondary} mt-8 flex justify-center items-center text-sm
        cursor-default`}>
          <span className="mr-2">Powered by</span>
          <Image
            src="/ReaLTimeLogo-White.png"
            width={80}
            height={80}
            className="rounded-lg w-20 h-auto"
            alt="Featured"
          />
        </div>
      </div>
    </div>
  );
}

