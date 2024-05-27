'use client';

import { findUser, sendRequest } from './action';
import { Center } from '@/components/layout/center';
import { Card, CardHeader } from '@/components/ui/card';
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
        <form action={dispatch}>
          <label htmlFor="mailaddress">メールアドレス</label>
          <Input id="mailaddress" type="email" name="mailaddress" />
          {state.error && <div>{state.error}</div>}
          <Button type="submit">検索</Button>
        </form>
        {state.mailaddress && (
          <Request mailaddress={state.mailaddress} name={state.name} />
        )}
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
        メールアドレス:
        <Input
          type="email"
          name="mailaddress"
          defaultValue={mailaddress}
          readOnly
        />
      </div>
      <div>名前: {name}</div>
      <Button type="submit">リクエストを送る</Button>
      {state.error && <div>{state.error}</div>}
    </form>
  );
};
