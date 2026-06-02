import { NotificationPreference } from "../enums/NotificationPreference";

export interface ServiceUnavailableRequest {
  id?: string;
  email: string;
  phone: string;
  serviceId: string;
  pincode: string;
  address: string;
  notificationPreference: NotificationPreference[];
  createdAt?: Date;
  notificationSent?: boolean;
}
