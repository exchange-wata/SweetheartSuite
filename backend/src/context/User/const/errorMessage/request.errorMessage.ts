export const RequestErrorMessage = {
  CREATE: 'can not create request',
  UPDATE: 'can not update request',
} as const;

export type RequestErrorMessage =
  (typeof RequestErrorMessage)[keyof typeof RequestErrorMessage];
