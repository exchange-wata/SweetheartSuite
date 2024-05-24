'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col">
      <div>
        <Button onClick={() => signOut()}>ログアウト</Button>
      </div>
      {children}
    </div>
  );
}
