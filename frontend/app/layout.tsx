'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex-col w-full">
            <Header />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

const Header = () => {
  const { data } = useSession();

  return (
    <div className="flex justify-between w-full bg-black p-4">
      <h1 className="text-white text-3xl">SweetheartSuite</h1>
      {data && (
        <Button variant="secondary" onClick={() => signOut()}>
          ログアウト
        </Button>
      )}
    </div>
  );
};
