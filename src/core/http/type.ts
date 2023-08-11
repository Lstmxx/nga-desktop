import { ResponseType } from "@tauri-apps/api/http";

export type IRequestConfig = & {
  url: string;
  data?: Record<string, any>;
  responseType?: ResponseType;
}