export interface Thread {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  countPosts: number;
}

export interface Post {
  id: number;
  threadId: number;
  postId: number;
  userName: string;
  email: string;
  userId: string;
  content: string;
  createdAt: string;
}
