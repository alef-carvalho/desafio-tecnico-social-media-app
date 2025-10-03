import React from 'react';
import { User } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pencil, Mail, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ProfileInfoProps {
  user: User;
  onEdit: () => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onEdit }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Meu Perfil</CardTitle>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="text-sm">{user.email}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Membro desde {formatDate(user.created_at)}</span>
        </div>

        {user.bio && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Bio</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{user.bio}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
