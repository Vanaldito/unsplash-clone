import { FetchCall } from "../models";

export default function getImages(): FetchCall {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/get-images", { signal: controller.signal }),
    controller,
  };
}
