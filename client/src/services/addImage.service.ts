import { FetchCall } from "../models";

export default function addImage(imageLink: string, label: string): FetchCall {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageLink, label }),
      signal: controller.signal,
    }),
    controller,
  };
}
