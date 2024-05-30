export const RequestErrorMessage = {
  CREATE: 'can not create request',
} as const;

export type RequestErrorMessage =
  (typeof RequestErrorMessage)[keyof typeof RequestErrorMessage];
