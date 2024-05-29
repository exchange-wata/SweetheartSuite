export const TempUserErrorMessage = {
  FIND_BY_TOKEN: 'can not find temp user',
  DELETE_MANY: 'can not delete temp user',
} as const;

export type TempUserErrorMessage =
  (typeof TempUserErrorMessage)[keyof typeof TempUserErrorMessage];
