export const CoupleErrorMessage = {
  FIND_BY_USER_ID: 'can not find couple by user id',
} as const;

export type CoupleErrorMessage =
  (typeof CoupleErrorMessage)[keyof typeof CoupleErrorMessage];
