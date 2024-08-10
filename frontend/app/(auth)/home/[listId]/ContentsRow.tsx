'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { setCompletedContents, setIncompleteContents } from './action';
import { useRouter } from 'next/navigation';

export const ContentsRow = ({
  contentsId,
  content,
  isDone,
}: {
  contentsId: string;
  content: string;
  isDone: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center border p-4 gap-2 rounded-2xl">
      <Checkbox
        checked={isDone}
        onClick={() => {
          isDone
            ? setIncompleteContents({ contentsId })
            : setCompletedContents({ contentsId });
          router.refresh();
        }}
      />
      {content}
    </div>
  );
};
