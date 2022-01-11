import { notify, NotificationsOptions } from "@kyvg/vue3-notification";
import { CircularBuffer } from 'algorithms';

export class NotificationService {
  private readonly _buffer: CircularBuffer<NotificationsOptions>;
  constructor() {
    this._buffer = new CircularBuffer(10);
  }

  public notifyInformation(message: string, title?: string) {
    this.dispatchNotification({
      type: 'info', 
      text: message, 
      title: title
    });
  }

  public notifyError(message: string, title?: string) {
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