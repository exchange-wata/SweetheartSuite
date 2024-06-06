export const RequestErrorMessage = {
  CREATE: 'can not create request',
  UPDATE: 'can not update request',
  FIND_BY_TO_USER_ID: 'can not find request by toUserId',
  FIND_BY_TO_USER_ID_AND_TYPE_ID: 'can not find request by toUserId and typeId',
} as const;

export type RequestErrorMessage =
  (typeof RequestErrorMessage)[keyof typeof RequestErrorMessage];
