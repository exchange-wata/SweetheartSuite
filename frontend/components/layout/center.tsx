import { cn } from '@/lib/utils';

export const Center = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {children}
    </div>
  );
};
