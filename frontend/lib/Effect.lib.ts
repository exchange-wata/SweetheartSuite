import { fail } from 'effect/Effect';

export const tag = <T extends string>(_tag: T) => ({ _tag } as const);

export const failWithTag = <T extends string>(_tag: T) =>
  fail({ _tag } as const);
