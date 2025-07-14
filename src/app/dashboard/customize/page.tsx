"use client"

import SocialMediaDialogs from "@/components/dashboard/SocialMediaDialogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronDown, ChevronUp, Facebook, Linkedin, MessageCircleHeart, Twitch, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CustomizePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("/profilePhoto.png");
  const [uploading, setUploading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("theme1");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string | null>(null);
  const [socialMediaUrl, setSocialMediaUrl] = useState<string>("");
  const [userSocialLinks, setUserSocialLinks] = useState<{ platform: string, url: string }[]>([]);
  const [socialMediaDialogOpen, setSocialMediaDialogOpen] = useState<boolean>(false);
  const [urlDialogOpen, setUrlDialogOpen] = useState<boolean>(false);
  const [isUpdatingSocialLinks, setIsUpdatingSocialLinks] = useState<boolean>(false);

  useEffect(() => {
    // TODO: fetch customize data
  }, [])

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      }
      reader.readAsDataURL(file);

      // try {
      //   setUploading(true);
      //   const photoUrl = await uploadProfilePhoto(file);

      //   if (photoUrl) {
      //     setPreviewImage(photoUrl);
      //   }
      // } catch (error) {
      //   console.error("Error uploading photo:", error);
      // } finally {
      //   setUploading(false);
      // }
    }
  }

  const handleSocialMediaSelect = (platform: string) => {
    setSelectedSocialMedia(platform);
    setSocialMediaDialogOpen(false);

    setTimeout(() => {
      setUrlDialogOpen(true);
    }, 100);
  }

  const handleSocialMediaUrlSubmit = async () => {
    if (selectedSocialMedia && socialMediaUrl) {
      const newLinks = [...userSocialLinks, {
        platform: selectedSocialMedia,
        url: socialMediaUrl
      }];

      setUserSocialLinks(newLinks);
      setSocialMediaUrl("");
      setUrlDialogOpen(false);

      setIsUpdatingSocialLinks(true);
      // await updateSocialLinks(newLinks);
      setIsUpdatingSocialLinks(false);
    }
  }

  const moveUp = async (index: number) => {
    if (index === 0) return; // Already at the top

    const newLinks = [...userSocialLinks];
    const temp = newLinks[index];
    newLinks[index] = newLinks[index - 1];
    newLinks[index - 1] = temp;

    setUserSocialLinks(newLinks);

    // Update the links on the server
    setIsUpdatingSocialLinks(true);
    // await updateSocialLinks(newLinks);
    setIsUpdatingSocialLinks(false);
  }

  const moveDown = async (index: number) => {
    if (index === userSocialLinks.length - 1) return; // Already at the bottom

    const newLinks = [...userSocialLinks];
    const temp = newLinks[index];
    newLinks[index] = newLinks[index + 1];
    newLinks[index + 1] = temp;

    setUserSocialLinks(newLinks);

    // Update the links on the server
    setIsUpdatingSocialLinks(true);
    // await updateSocialLinks(newLinks);
    setIsUpdatingSocialLinks(false);
  }

  const handleDeleteSocialLink = async (index: number) => {
    const newLinks = userSocialLinks.filter((_, i) => i !== index);
    setUserSocialLinks(newLinks);

    // Update the links on the server
    setIsUpdatingSocialLinks(true);
    // await updateSocialLinks(newLinks);
    setIsUpdatingSocialLinks(false);
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="mr-2" />;
      case "X":
        return <Twitter className="mr-2" />;
      case "Linkedin":
        return <Linkedin className="mr-2" />;
      case "Twitch":
        return <Twitch className="mr-2" />;
      default:
        return <MessageCircleHeart className="mr-2" />;
    }
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Customize Page</CardTitle>
          <CardDescription>Customize your page to your taste</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2 items-center">
            <div className="relative w-[120px] h-[120px] group">
              <Image
                src={previewImage}
                width={120}
                height={120}
                className="rounded-full object-cover cursor-pointer w-full h-full"
                alt="Preview of the profile photo"
                onClick={handleImageClick}
              />
              <div
                onClick={handleImageClick}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center
                justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                cursor-pointer"
              >
                <span className="text-white text-sm font-medium">Upload Photo</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>* Upload a profile photo</p>
              <p>* Allowed file types: .jpg, .jpeg, .png</p>
              <p>* Maximum file size: 5MB</p>
              {uploading && <p className="text-primary">Uploading...</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <div className="flex">
              <Textarea
                id="bio"
                placeholder="You can enter a biography about yourself"
                className="resize-none rounded-none rounded-l-lg"
              />
              <Button
                className="h-full rounded-none rounded-r-lg cursor-pointer">
                <Check />
              </Button>
            </div>
          </div>
          <div className="my-4 grid gap-2">
            <Label>Social Media Links</Label>

            {/* display users's added social links */}
            {userSocialLinks.length > 0 && (
              <div className="grid gap-2 mb-3">
                {userSocialLinks.map((link, index) => (
                  <div key={index} className="flex items-center border pr-2 rounded">
                    <div className="gap grid-rows-2 gap-0 mr-2">
                      <div
                        onClick={() => moveUp(index)}
                        aria-label="Move up"
                        className="hover:bg-gray-500 cursor-pointer">
                        <ChevronUp />
                      </div>
                      <div
                        onClick={() => moveDown(index)}
                        aria-label="Move down"
                        className="hover:bg-gray-500 cursor-pointer">
                        <ChevronDown />
                      </div>
                    </div>
                    <div className="flex">
                      {getSocialIcon(link.platform)}
                      <span>{link.platform}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                        {link.url}
                      </span>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => handleDeleteSocialLink(index)}
                        disabled={isUpdatingSocialLinks}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setSocialMediaDialogOpen(true)}
              disabled={isUpdatingSocialLinks}
            >
              <MessageCircleHeart className="mr-2" />
              Add Social Media Link
            </Button>

            <SocialMediaDialogs
              socialMediaDialogOpen={socialMediaDialogOpen}
              setSocialMediaDialogOpen={setSocialMediaDialogOpen}
              urlDialogOpen={urlDialogOpen}
              setUrlDialogOpen={setUrlDialogOpen}
              selectedSocialMedia={selectedSocialMedia}
              setSelectedSocialMedia={setSelectedSocialMedia}
              socialMediaUrl={socialMediaUrl}
              setSocialMediaUrl={setSocialMediaUrl}
              handleSocialMediaSelect={handleSocialMediaSelect}
              handleSocialMediaUrlSubmit={handleSocialMediaUrlSubmit}
            />
          </div>
          <div className="grid gap-2 my-4">
            <Label>Themes</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className={
                `flex items-center gap-2 rounded-2xl p-2 cursor-pointer
                ${theme === "theme1" && "border-4 border-primary text-primary" || "border border-blue-500 text-blue-500"}`
              }
                onClick={() => setTheme("theme1")}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Tema 1</span>
                </div>
              </div>
              <div className={
                `flex items-center gap-2 rounded-2xl p-2 cursor-pointer
                ${theme === "theme2" && "border-4 border-primary text-primary" || "border border-red-500 text-red-500"}`
              }
                onClick={() => setTheme("theme2")}
              >
                <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Tema 2</span>
                </div>
              </div>
              <div className={
                `flex items-center gap-2 rounded-2xl p-2 cursor-pointer
                ${theme === "theme3" && "border-4 border-primary text-primary" || "border border-yellow-500 text-yellow-500"}`
              }
                onClick={() => setTheme("theme3")}
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Tema 3</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        <iframe
          src="http://localhost:3000/yasarcan"
          className="w-[400px] h-[800px] border border-primary rounded-2xl flex-none border-4"
        />
      </div>
    </div >
  )
}