import api from '@/lib/api';
import { User, UpdateProfileData } from '@/types';

interface ProfileWithPosts extends User {
  posts: any[];
}

export const profileService = {
  async getProfile(): Promise<ProfileWithPosts> {
    const response = await api.get<ProfileWithPosts>('/profile');
    return response.data;
  },

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await api.put<User>('/profile', data);
    return response.data;
  }
};
