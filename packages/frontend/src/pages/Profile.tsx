import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { profileService } from '@/services/profileService';
import { User } from '@/types';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await profileService.getProfile();
      setUser(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdated = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando perfil...</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {user && !isEditing && (
            <ProfileInfo user={user} onEdit={() => setIsEditing(true)} />
          )}

          {user && isEditing && (
            <EditProfileForm
              user={user}
              onProfileUpdated={handleProfileUpdated}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};
