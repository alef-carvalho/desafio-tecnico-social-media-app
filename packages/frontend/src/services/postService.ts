import api from '@/lib/api';
import { Post, CreatePostData, UpdatePostData } from '@/types';

export const postService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  }
};
