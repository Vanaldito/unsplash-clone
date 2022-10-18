import { FetchCall } from "../models";

export default function searchImages(query: string): FetchCall {
  const controller = new AbortController();

  return {
    call: fetch(`/api/v1/search?q=${query}`, { signal: controller.signal }),
    controller,
  };
}
