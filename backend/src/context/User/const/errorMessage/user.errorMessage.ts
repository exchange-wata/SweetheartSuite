export const UserErrorMessage = {
  CREATE: 'can not create user',
  GET_USER_BY_MAILADDRESS: 'can not get user by mailaddress',
} as const;

export type UserErrorMessage =
  (typeof UserErrorMessage)[keyof typeof UserErrorMessage];
