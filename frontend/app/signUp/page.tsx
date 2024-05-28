'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { action } from './action';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Center } from '@/components/layout/center';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function SignUp({
  searchParams,
}: {
  searchParams: { tempToken: string };
}) {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const { id } = await action({
      name,
      token: searchParams.tempToken,
    });
    signIn('credentials', { id });
    router.push('/home');
  };

  return (
    <Center className="m-20">
      <Card>
        <CardHeader className="items-center">
          <h1 className="font-bold text-3xl">新規登録</h1>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="m-10">
              <label className="text-lg">名前</label>
              <Input
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit">登録</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Center>
  );
}
