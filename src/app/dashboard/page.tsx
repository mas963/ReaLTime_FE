"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, BellPlus, BellRing, PlusSquare } from "lucide-react";
import NotificationCard from "@/components/profile/NotificationCard";
import { useState } from "react";

export default function DashboardPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My ReaLTime ✋</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-[20%_80%]">
        <div className="md:flex md:flex-col grid grid-cols-2 gap-4 h-full">
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold flex items-center">
                <BellRing className="w-5 h-5 mr-2" />
                4201
              </div>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">4201</div>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">4201</div>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">4201</div>
            </CardContent>
          </Card>
        </div>
        <div className="md:ml-4">
          {!isFormVisible && (
            <div className="flex justify-center mb-4">
              <Button
                className="w-[300px] h-[50px] cursor-pointer text-xl"
                onClick={() => setIsFormVisible(true)}
              >
                <BellPlus />
                Publish Notification
              </Button>
            </div>
          )}

          {isFormVisible && (
            <div
              className={`transition-all duration-300 ${isFormVisible ? "animate-in fade-in slide-in-from-top-4" : "animate-out fade-out slide-out-to-top-4"
                }`}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Publish notification</CardTitle>
                  <CardDescription>Now you can publish notification</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="title">Title *</Label>
                        <Input id="title" placeholder="Title of your notification" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Description of your notification" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="link">Link</Label>
                        <Input id="link" placeholder="Link to be redirected" />
                        <p className="text-sm text-muted-foreground">
                          Notification icon changes according to the link added
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsFormVisible(false)}>Cancel</Button>
                  <Button>Publish</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          <NotificationCard
            title="Notification title"
            description="Notification description"
            link="https://realti.me/yourname"
            date="2025-04-03 15:12"
            theme={{
              background: "bg-card",
              iconBackground: "bg-primary",
              text: "text-primary",
              iconColor: "text-white",
            }}
          />
          <NotificationCard
            title="Notification title"
            description="Notification description"
            link="https://realti.me/yourname"
            date="2025-04-01 13:12"
            icon="Youtube"
            theme={{
              background: "bg-card",
              iconBackground: "bg-primary",
              text: "text-primary",
              iconColor: "text-white",
            }}
          />
          <NotificationCard
            title="Notification title"
            description="Notification description"
            link="https://realti.me/yourname"
            date="2025-04-02 20:24"
            theme={{
              background: "bg-card",
              iconBackground: "bg-primary",
              text: "text-primary",
              iconColor: "text-white",
            }}
          />
        </div>
      </div>
    </div>
  )
}
