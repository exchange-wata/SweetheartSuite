'use client';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { accept, reject } from './action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const RecievedRequest = ({ fromUserId }: { fromUserId: string }) => {
  const [isRejected, setIsRejected] = useState(false);
  const router = useRouter();

  return (
    <CardContent>
      <div>リクエストを受け取っています</div>
      <div>fromUserId: {fromUserId}</div>
      {isRejected ? (
        <div>リクエストを拒否しました</div>
      ) : (
        <>
          <Button
            onClick={() => {
              accept();
              router.refresh();
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              setIsRejected(true);
              reject();
            }}
          >
            Reject
          </Button>
        </>
      )}
    </CardContent>
  );
};
