import Image from "next/image";
import { getProfileData } from "./profileData";
import NotificationCard from "@/components/profile/NotificationCard";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug} - ReaLTime`,
    description: `${params.slug} profili`,
  };
}

export default async function UserPage({ params }: { params: { slug: string } }) {
  const userData = getProfileData(params.slug);

  if (!userData) {
    return <h1 className="text-red-500">Kullanıcı bulunamadı</h1>;
  }

  return (
    <div className="flex flex-col items-center">
      <Image src={userData.avatar} width={100} height={100} className="rounded-full" alt="Avatar" />
      <h1 className="text-xl font-semibold mt-2">{userData.name}</h1>
      <p className="text-gray-400">{userData.bio}</p>

      <div className="mt-6 max-w-md">
        <NotificationCard
          title="Yeni Bildirim"
          description="Bu bir test bildirimidir."
          link="https://example.com"
          date="2023-09-19"
        />

        <NotificationCard
          title="Bağlantısız Bildirim"
          description="Bu bildirim sosyal medya paylaşımı içindir."
          date="2023-09-19"
        />
      </div>


      <div className="mt-6">
        <Image src="/ReaLTimeLogo-White.png" width={100} height={100} className="rounded-lg" alt="Featured" />
      </div>
    </div>
  );
}