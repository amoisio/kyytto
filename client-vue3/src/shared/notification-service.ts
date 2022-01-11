import { notify, NotificationsOptions } from "@kyvg/vue3-notification";
import { CircularBuffer } from 'algorithms';

export class NotificationService {
  private readonly _buffer: CircularBuffer<NotificationsOptions>;
  constructor() {
    this._buffer = new CircularBuffer(10);
  }

  public notifySuccess(message: string, title?: string) {
    console.log(message);
    this.dispatchNotification({
      type: 'success',
      text: message,
      title: title
    });
  }

  public notifyInformation(message: string, title?: string) {
    console.log(message);
    this.dispatchNotification({
      type: 'info', 
      text: message, 
      title: title
    });
  }

  public notifyWarning(message: string, title?: string) {
    console.warn(message);
    this.dispatchNotification({
      type: 'warn',
      text: message,
      title: title
    });
  }

  public notifyError(message: string, title?: string, exception?: any) {
    console.error(message, exception);
    this.dispatchNotification({
      type: 'error', 
      text: message, 
      title: title
    });
  }

  private dispatchNotification(notification: NotificationsOptions) {
    this._buffer.push(notification);
    notify(notification);
  }
}