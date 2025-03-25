export async function getProfileData(username: string) {
  const users = {
    "yasarcan": {
      name: "Yasar Can",
      bio: "hello world",
      avatar: "/profilePhoto.png",
      notifications: [
        {
          id: 1,
          title: "New youtube video",
          description: "new youtube view release!",
          link: "https://youtube.com",
          date: "2025-03-24 15:12"
        },
        {
          id: 2,
          title: "New youtube video2",
          description: "new youtube view release2!",
          link: "https://youtube2.com",
          date: "2025-03-23 20:24"
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