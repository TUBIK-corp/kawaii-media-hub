export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface MediaPost {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  genres: string[];
  authorId: string;
}

export const USERS: Record<string, User> = {
  cyberninja: {
    id: "cyberninja",
    username: "CyberNinja",
    avatar: "https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080",
    bio: "Digital art enthusiast | Cyberpunk lover | NFT Creator",
    stats: {
      posts: 42,
      followers: 890,
      following: 234
    }
  },
  nightartist: {
    id: "nightartist",
    username: "NightArtist",
    avatar: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    bio: "Digital Artist | Night owl | Fantasy creator",
    stats: {
      posts: 156,
      followers: 1234,
      following: 445
    }
  }
};

export const MEDIA_POSTS: MediaPost[] = [
  {
    id: "1",
    imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
    title: "Kawaii Dreams",
    likes: 342,
    comments: 56,
    genres: ["Art", "Fantasy"],
    authorId: "cyberninja"
  },
  {
    id: "2",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    title: "Magical Forest",
    likes: 567,
    comments: 89,
    genres: ["Fantasy", "Art"],
    authorId: "nightartist"
  },
  {
    id: "3",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/44/anime-7888413_1280.jpg",
    title: "Urban Adventures",
    likes: 234,
    comments: 45,
    genres: ["Action", "Comedy"],
    authorId: "nightartist"
  },
  {
    id: "4",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-girl-7632904_1280.jpg",
    title: "Sunset Memories",
    likes: 789,
    comments: 123,
    genres: ["Slice of Life", "Romance"],
    authorId: "cyberninja"
  }
];

export const getUserPosts = (userId: string): MediaPost[] => {
  return MEDIA_POSTS.filter(post => post.authorId === userId);
};

export const getUser = (userId: string): User | undefined => {
  return USERS[userId];
};

export const getMediaById = (id: string): MediaPost | undefined => {
  return MEDIA_POSTS.find(post => post.id === id);
};