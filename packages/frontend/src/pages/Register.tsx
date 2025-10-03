import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <RegisterForm />
    </div>
  );
};
