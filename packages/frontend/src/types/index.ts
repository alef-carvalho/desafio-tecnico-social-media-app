export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  created_at: string;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreatePostData {
  content: string;
}

export interface UpdatePostData {
  content: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
}
