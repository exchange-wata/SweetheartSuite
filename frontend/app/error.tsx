'use client';

import { Center } from '@/components/layout/center';
import { Card } from '@/components/ui/card';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  if (error.message.includes('Unauthorized')) {
    return (
      <Center>
        <Card className="w-[350px] h-[400px] flex-col items-center justify-center p-5">
          <div className="flex flex-col gap-5 justify-center items-center h-full">
            <label>ログインしてください</label>
            <div>
              <Link href={'/'} onClick={() => signOut()}>
                ログインページへ
              </Link>
            </div>
          </div>
        </Card>
      </Center>
    );
  }
}
