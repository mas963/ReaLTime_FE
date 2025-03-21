import { date } from "zod";

export function getProfileData(username: string) {
  const users = {
    "yasarcan": {
      name: "Yasar Can",
      bio: "hello world",
      avatar: "/profilePhoto.png",
      notifications: [
        {
          title: "New youtube video",
          contect: "new youtube view release!",
          link: "https://youtube.com",
          date: "2023-09-19"
        },
        {
          title: "New youtube video2",
          contect: "new youtube view release2!",
          link: "https://youtube2.com",
          date: "2023-09-19"
        },
        {
          title: "New youtube video2",
          contect: "new youtube view release2!",
          link: "",
          date: "2023-09-19"
        },
      ],
    },
  };

  return users[username] || null;
}