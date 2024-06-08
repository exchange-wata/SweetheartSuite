'use client';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { accept, reject } from './action';
import { useState } from 'react';

export const RecievedRequest = ({ fromUserId }: { fromUserId: string }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  return (
    <CardContent>
      <div>リクエストを受け取っています</div>
      <div>fromUserId: {fromUserId}</div>
      {isAccepted || isRejected ? (
        <div>リクエストを{isAccepted ? '承認' : '拒否'}しました</div>
      ) : (
        <>
          <Button
            onClick={() => {
              setIsAccepted(true);
              accept();
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
