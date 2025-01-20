import { LoginForm } from '@/components/login-form';
import { useEffect } from 'react';
import sessions from '../../../utils/sessions';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessions.getSessionToken();

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
