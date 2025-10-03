import React, { useEffect, useState } from 'react';
import { Post } from '@/types';
import { postService } from '@/services/postService';
import { PostItem } from './PostItem';

export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar postagens');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handlePostDeleted = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Carregando postagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma postagem ainda. Seja o primeiro a postar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
};
