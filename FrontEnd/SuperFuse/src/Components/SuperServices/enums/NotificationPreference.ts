export const NotificationPreference = {
  EMAIL: "EMAIL",
  SMS: "SMS",
  PUSH: "PUSH",
  ALL: "ALL",
} as const;

export type NotificationPreference =
  (typeof NotificationPreference)[keyof typeof NotificationPreference];
