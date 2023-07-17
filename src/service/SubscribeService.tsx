import { call } from "./ApiService";

export interface SubscriberDTO {
  userId: number;
  subscriberId: number;
}

export function createSubscriber(subscriberDTO: SubscriberDTO) {
  return call("/subscribers", "POST", subscriberDTO);
}

export function deleteSubscriber(subscriberId: number) {
  return call(`/subscribers/${subscriberId}`, "DELETE");
}

export function checkSubscriptionStatus(
  userId: number,
  subscriberId: number
): Promise<boolean> {
  return call(`/subscribers/${subscriberId}`, "GET");
}
