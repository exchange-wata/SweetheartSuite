'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <h1>ログイン</h1>
      <Button onClick={() => signIn('google')}>Googleでログイン</Button>
    </div>
  );
}
