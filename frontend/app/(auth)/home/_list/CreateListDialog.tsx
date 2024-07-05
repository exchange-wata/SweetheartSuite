'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createList } from './action';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const CreateListDialog = () => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>();

  const onSubmit = async ({ name }: { name: string }) => {
    await createList({ name });
    setVisible(false);
  };

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <Button> リスト作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>リスト作成</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="リストの名前"
            {...register('name', {
              required: 'リストの名前を入力してください',
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <Button type="submit">作成</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
