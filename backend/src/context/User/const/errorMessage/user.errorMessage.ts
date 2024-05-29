export const UserErrorMessage = {
  CREATE: 'can not create user',
} as const;

export type UserErrorMessage =
  (typeof UserErrorMessage)[keyof typeof UserErrorMessage];
