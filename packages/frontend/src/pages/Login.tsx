import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <LoginForm />
    </div>
  );
};
