"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Linkedin, MessageCircleHeart, Twitch, Twitter } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const socialMedias = [
  { name: "Instagram" },
  { name: "Twitter" },
  { name: "Linkedin" },
  { name: "Github" }
];

export default function CustomizePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("/profilePhoto.png");
  const [uploading, setUploading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("theme1");

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

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const res = await fetch("/api/upload-photo", {
          method: "POST",
          body: formData
        });

        if (!res.ok) {
          throw new Error("Failed to upload photo");
        }

        const data = await res.json();
        console.log("Photo uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading photo:", error);
      } finally {
        setUploading(false);
      }
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
                className="absolute inset-0 bg-black/50 rounded-full flex items-center items-center
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
            <Textarea
              id="bio"
              placeholder="You can enter a biography about yourself"
              className="resize-none"
            />
          </div>
          <div className="my-4 grid gap-2">
            <Label>Social Media Links</Label>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                >
                  <MessageCircleHeart /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add social media links</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Button variant="outline" className="cursor-pointer">
                      <Facebook /> Facebook
                    </Button>
                    <Button variant="outline" className="cursor-pointer">
                      <Twitter /> X
                    </Button>
                    <Button variant="outline" className="cursor-pointer">
                      <Linkedin /> Linkedin
                    </Button>
                    <Button variant="outline" className="cursor-pointer">
                      <Twitch /> Twitch
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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