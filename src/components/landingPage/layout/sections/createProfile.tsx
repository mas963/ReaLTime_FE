import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCircle } from "lucide-react"

export const CreateProfileSection = () => {
  return (
    <section id="create-profile" className="pb-12">
      <hr className="border-secondary" />
      <div className="@container py-15 sm:py-15">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center
          flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <UserCircle className="w-20 h-20" />
                <div>
                  Create your
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    profile?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Receiving notifications from others does not require registration, but there may be people who want to receive notifications from you 🚀
            </CardContent>

            <CardFooter>
              <div className="flex group">
                <Label htmlFor="yourname">RealTi.me/</Label>
                <Input type="text" id="yourname" placeholder="yourname" className="w-[130px] focus-visible:ring-transparent pl-0" />
              </div>
              <Button asChild className="ml-2 animate-bounce animate-infinite animate-duration-2000">
                <a href="/register">Let's go!</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  )
}