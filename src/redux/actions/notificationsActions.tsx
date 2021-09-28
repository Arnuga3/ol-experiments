export enum NotificationsActions {
  SHOW_ERROR_NOTIFICATION = "SHOW_ERROR_NOTIFICATION",
  SHOW_SUCCESS_NOTIFICATION = "SHOW_SUCCESS_NOTIFICATION",
  HIDE_NOTIFICATION = "HIDE_NOTIFICATION",
}

export interface ShowError {
  type: NotificationsActions.SHOW_ERROR_NOTIFICATION;
  message: string;
}

export interface ShowSuccess {
  type: NotificationsActions.SHOW_SUCCESS_NOTIFICATION;
  message: string;
}

export interface HideNotification {
  type: NotificationsActions.HIDE_NOTIFICATION;
  id: string;
}

export const showError = (message: string): ShowError => ({
  type: NotificationsActions.SHOW_ERROR_NOTIFICATION,
  message,
});

export const showSuccess = (message: string): ShowSuccess => ({
  type: NotificationsActions.SHOW_SUCCESS_NOTIFICATION,
  message,
});

export const hideMotification = (id: string): HideNotification => ({
  type: NotificationsActions.HIDE_NOTIFICATION,
  id,
});