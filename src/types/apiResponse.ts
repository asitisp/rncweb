import { Message } from "@/models/message";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  isAcceptingMsg?: boolean;
  data?: T;
  messages?: Array<Message>;
}
