'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { action } from './action';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUp({
  searchParams,
}: {
  searchParams: { tempToken: string };
}) {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const { mailaddress } = await action({
      name,
      token: searchParams.tempToken,
    });
    signIn('credentials', { mailaddress });
    router.push('/home');
  };

  return (
    <div>
      <h1>新規登録</h1>
      <div>
        <form action={handleSubmit}>
          <label>名前</label>
          <Input
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <Button type="submit">登録</Button>
        </form>
      </div>
    </div>
  );
}
