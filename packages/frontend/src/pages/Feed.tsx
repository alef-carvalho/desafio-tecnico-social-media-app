import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CreatePost } from '@/components/feed/CreatePost';
import { PostList } from '@/components/feed/PostList';
import { Post } from '@/types';

export const Feed: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // @ts-ignore
  const handlePostCreated = (post: Post) => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <CreatePost onPostCreated={handlePostCreated} />
          <PostList key={refreshKey} />
        </div>
      </main>
    </div>
  );
};
