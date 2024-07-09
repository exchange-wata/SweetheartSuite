'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createContents } from './action';

export const CreateContentsDialog = ({ listId }: { listId: string }) => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ content: string }>();

  const onSubmit = async ({
    listId,
    content,
  }: {
    listId: string;
    content: string;
  }) => {
    await createContents({ listId, content });
    setVisible(false);
  };

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Button> やること作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>やること作成</DialogTitle>
        <form
          onSubmit={handleSubmit(({ content }: { content: string }) =>
            onSubmit({ listId, content }),
          )}
        >
          <Input
            type="text"
            placeholder="やること"
            {...register('content', {
              required: 'やることを入力してください',
            })}
          />
          {errors.content && <p>{errors.content.message}</p>}
          <Button type="submit">作成</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
