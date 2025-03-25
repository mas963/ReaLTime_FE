import Image from "next/image";
import { getProfileData } from "./profileData";
import NotificationCard from "@/components/profile/NotificationCard";
import { Bell, Ellipsis } from "lucide-react";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

const fetchPost = cache(async (slug: string) => {
  return await getProfileData(slug);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchPost(params.slug);

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

export default async function UserPage({ params }: { params: { slug: string } }) {
  const userData = await getProfileData(params.slug);

  if (!userData) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center my-2">
      <div className=" items-center grid grid-cols-3 justify-items-center">
        <button className="w-12 h-12 hover:bg-gray-400 bg-gray-800 rounded-full 
        flex items-center justify-center cursor-pointer">
          <Bell className="text-primary" />
        </button>
        <Image src={userData.avatar} width={100} height={100} className="rounded-full" alt="Avatar" />
        <button className="w-12 h-12 hover:bg-gray-400 bg-gray-800 rounded-full 
        flex items-center justify-center cursor-pointer">
          <Ellipsis className="text-primary" />
        </button>
      </div>
      <h1 className="text-xl font-semibold mt-2">{userData.name}</h1>
      <p className="text-gray-400">{userData.bio}</p>

      <div className="mt-6 mx-2">
        {userData.notifications.map((notification: any) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            description={notification.description}
            link={notification.link}
            date={notification.date}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-2 items-center text-gray-400 cursor-default">
        Powered by
        <Image src="/ReaLTimeLogo-White.png" width={90} height={90} className="rounded-lg" alt="Featured" />
      </div>
    </div>
  );
}