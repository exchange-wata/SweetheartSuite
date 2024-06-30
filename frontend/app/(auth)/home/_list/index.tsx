'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createList } from './action';
import { Center } from '@/components/layout/center';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const HomeList = () => {
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
    <Center className="m-10">
      <Card className="w-[350px] h-[400px] flex-col items-center justify-center p-5">
        <CardHeader className="items-center">やりたいことリスト</CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </Center>
  );
};
