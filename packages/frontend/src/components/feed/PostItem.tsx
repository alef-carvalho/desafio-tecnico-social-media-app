import React, { useState } from 'react';
import { Post } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { postService } from '@/services/postService';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePostSchema, UpdatePostFormData } from '@/schemas/postSchema';

interface PostItemProps {
  post: Post;
  onPostUpdated: (post: Post) => void;
  onPostDeleted: (postId: string) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onPostUpdated, onPostDeleted }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAuthor = user?.id === post.authorId;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      content: post.content
    }
  });

  const handleUpdate = async (data: UpdatePostFormData) => {
    try {
      setLoading(true);
      setError('');
      const updatedPost = await postService.updatePost(post.id, data);
      onPostUpdated(updatedPost);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar postagem');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta postagem?')) return;

    try {
      setLoading(true);
      await postService.deletePost(post.id);
      onPostDeleted(post.id);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao deletar postagem');
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
          </div>

          {isAuthor && !isEditing && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <Textarea {...register('content')} rows={3} />

            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={loading}>
                <Check className="h-4 w-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-wrap">{post.content}</p>
        )}
      </CardContent>
    </Card>
  );
};
