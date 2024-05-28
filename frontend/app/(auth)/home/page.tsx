'use client';

import { findUser, sendRequest } from './action';
import { Center } from '@/components/layout/center';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';

export default function Home() {
  const [state, dispatch] = useFormState(findUser, {
    mailaddress: '',
    name: '',
    error: '',
  });

  return (
    <Center className="m-10">
      <Card className="w-[350px] h-[400px] flex-col items-center justify-center p-5">
        <CardHeader className="items-center">リクエスト</CardHeader>
        <CardContent className="grid gap-8">
          <form action={dispatch}>
            <label htmlFor="mailaddress">リクエストするメールアドレス</label>
            <Input id="mailaddress" type="email" name="mailaddress" />
            {state.error && <div>{state.error}</div>}
            <Button type="submit">検索</Button>
          </form>

          {state.mailaddress && (
            <Request mailaddress={state.mailaddress} name={state.name} />
          )}
        </CardContent>
      </Card>
    </Center>
  );
}

const Request = ({
  mailaddress,
  name,
}: {
  mailaddress: string;
  name: string;
}) => {
  const [state, dispatch] = useFormState(sendRequest, {
    mailaddress: '',
    error: '',
  });

  return (
    <form action={dispatch}>
      <div>
        <Input
          type="email"
          name="mailaddress"
          defaultValue={mailaddress}
          readOnly
        />
      </div>
      <div className="text-lg">名前: {name}</div>
      <Button type="submit">リクエストを送る</Button>
      {state.error && <div>{state.error}</div>}
    </form>
  );
};
