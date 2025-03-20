"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section className="@container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto
      py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> With you now! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl
          md:text-6xl font-bold">
            <h1>
              Get notified in
              <span className="text-transparent px-2 bg-gradient-to-r 
              from-[#D247BF] to-primary bg-clip-text">
                ReaLTime
              </span>
              in seconds
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`ReaLTime notification platform that lets you receive notifications in seconds. Create and publish notifications now.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get started for free
              <ArrowRight className="size-5 ml-2 group-hover/arrow:transalate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="/"
                target="_blank"
              >
                Explore plans
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-2">
        <div className="absolute top-2 left-1/2  lg:-top-8 transform -translate-x-1/2 w-[90%]
        mx-auto h-24 lg:h-[70%] bg-purple-500/50 rounded-full blur-3xl"></div>

          <Image
            width={1200}
            height={1200}
            className="w-full md:-[1200px] mx-auto rounded-lg relative
            rounded-lg leading-none flex items-center"
            src={
              theme === "light"
                ? "/hero-image.png"
                : "/hero-image.png"
            }
            alt="Hero Image"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b 
          from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}