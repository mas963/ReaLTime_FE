import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronLeft, Facebook, Linkedin, Twitch, Twitter } from "lucide-react";
import { Input } from "../ui/input";

interface SocialMediaDialogsProps {
  socialMediaDialogOpen: boolean;
  setSocialMediaDialogOpen: Dispatch<SetStateAction<boolean>>;
  urlDialogOpen: boolean;
  setUrlDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedSocialMedia: string | null;
  setSelectedSocialMedia: Dispatch<SetStateAction<string | null>>;
  socialMediaUrl: string;
  setSocialMediaUrl: Dispatch<SetStateAction<string>>;
  handleSocialMediaSelect: (platform: string) => void;
  handleSocialMediaUrlSubmit: () => void;
}

export default function SocialMediaDialogs({
  socialMediaDialogOpen,
  setSocialMediaDialogOpen,
  urlDialogOpen,
  setUrlDialogOpen,
  selectedSocialMedia,
  setSelectedSocialMedia,
  socialMediaUrl,
  setSocialMediaUrl,
  handleSocialMediaSelect,
  handleSocialMediaUrlSubmit
}: SocialMediaDialogsProps) {

  return (
    <>
      <Dialog open={socialMediaDialogOpen} onOpenChange={setSocialMediaDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add social media links</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleSocialMediaSelect("Facebook")}
              >
                <Facebook className="mr-2" /> Facebook
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleSocialMediaSelect("X")}
              >
                <Twitter className="mr-2" /> X
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleSocialMediaSelect("Linkedin")}
              >
                <Linkedin className="mr-2" /> Linkedin
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleSocialMediaSelect("Twitch")}
              >
                <Twitch className="mr-2" /> Twitch
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setSocialMediaDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={urlDialogOpen} onOpenChange={(open) => {
        setUrlDialogOpen(open);
        // if dialog is closed and we didn't save the URL
        if (!open && selectedSocialMedia) {
          setSelectedSocialMedia(null);
          setSocialMediaUrl('');
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <Button
                variant="ghost"
                className="cursor-pointer mr-2"
                onClick={() => {
                  setUrlDialogOpen(false);
                  setSelectedSocialMedia(null);
                  setSocialMediaUrl('');
                  setSocialMediaDialogOpen(true);
                }}>
                <ChevronLeft />
              </Button>
              Add {selectedSocialMedia} URL
            </DialogTitle>
            <DialogDescription>
              Enter the URL of your {selectedSocialMedia} profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Enter the url"
                value={socialMediaUrl}
                onChange={(e) => setSocialMediaUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={handleSocialMediaUrlSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}