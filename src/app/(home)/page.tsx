import { CreateProfileSection } from "@/components/landingPage/layout/sections/createProfile";
import { FAQSection } from "@/components/landingPage/layout/sections/faq";
import { FooterSection } from "@/components/landingPage/layout/sections/footer";
import { HeroSection } from "@/components/landingPage/layout/sections/hero";
import { MobileSample } from "@/components/landingPage/layout/sections/mobileSample";
import { PricintSection } from "@/components/landingPage/layout/sections/pricing";

export const metadata = {
  title: "ReaLTime - Welcome",
  description: "Get notified in seconds with ReaLTime",
  openGraph: {
    type: "website",
    url: "https://ReaLTime.vercel.app/",
    title: "ReaLTime - Welcome",
    description: "Get notified in seconds with ReaLTime",
    images: [
      {
        url: "https://ReaLTime.vercel.app/og.png",
        width: 800,
        height: 600,
        alt: "ReaLTime - Welcome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReaLTime - Welcome",
    description: "Get notified in seconds with ReaLTime",
    images: ["https://ReaLTime.vercel.app/og.png"],
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CreateProfileSection />
      <MobileSample />
      <PricintSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
