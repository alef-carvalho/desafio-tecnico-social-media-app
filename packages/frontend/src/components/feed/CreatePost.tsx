import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostFormData } from '@/schemas/postSchema';
import { postService } from '@/services/postService';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Post } from '@/types';

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema)
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      setLoading(true);
      setError('');
      const newPost = await postService.createPost(data);
      onPostCreated(newPost);
      reset();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar postagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Textarea
            placeholder="No que você está pensando?"
            rows={3}
            {...register('content')}
          />
          
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
