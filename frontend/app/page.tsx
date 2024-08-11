'use client';

import { Center } from '@/components/layout/center';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <Center className="m-20">
      <Card size="lg" className="h-[350px] flex items-center justify-center">
        <CardContent>
          <Button onClick={() => signIn('google')}>Googleでログイン</Button>
        </CardContent>
      </Card>
    </Center>
  );
}
