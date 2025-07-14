export function getProfileData(username: string) {
  const users = {
    "yasarcan": {
      name: "Yasar Can",
      bio: "hello world",
      avatar: "/profilePhoto.png",
      theme: "theme3",
      notifications: [
        {
          id: 1,
          title: "New youtube video",
          description: "new youtube view release!",
          link: "https://youtube.com",
          date: "2025-04-03 15:12",
          icon: "Youtube"
        },
        {
          id: 2,
          title: "New youtube video2",
          description: "new youtube view release22222222 asdasds!",
          link: "https://youtube2.com",
          date: "2025-04-02 20:24",
          icon: "Music"
        },
        {
          id: 3,
          title: "New youtube video2",
          description: "new youtube view release2!",
          link: "",
          date: "2025-03-22 13:54"
        },
      ],
    },
  };

  return users[username] || null;
}