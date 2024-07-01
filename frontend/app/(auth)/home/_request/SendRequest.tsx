'use client';

import { Button } from '@/components/ui/button';
import { CardHeader, CardContent } from '@/components/ui/card';
import { useFormState } from 'react-dom';
import { findUser, sendRequest } from './action';
import { Input } from '@/components/ui/input';

export const SendRequest = () => {
  const [state, dispatch] = useFormState(findUser, {
    mailaddress: '',
    name: '',
    error: '',
  });

  return (
    <>
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
    </>
  );
};

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
      {!state.error && state.mailaddress && <div>リクエストしました</div>}
    </form>
  );
};
