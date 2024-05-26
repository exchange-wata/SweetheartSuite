'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex items-center justify-center m-20">
      <Card className="w-[350px] h-[350px] flex items-center justify-center">
        <CardContent>
          <Button onClick={() => signIn('google')}>Googleでログイン</Button>
        </CardContent>
      </Card>
    </div>
  );
}
