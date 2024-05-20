'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (!data) signIn();
  }, [status, data]);

  return (
    <div className="flex-col">
      <div>
        <Button onClick={() => signOut()}>ログアウト</Button>
      </div>
      {children}
    </div>
  );
}
