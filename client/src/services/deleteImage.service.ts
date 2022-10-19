import { FetchCall } from "../models";

export default function deleteImage(id: string, password: string): FetchCall {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/delete-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
      signal: controller.signal,
    }),
    controller,
  };
}
