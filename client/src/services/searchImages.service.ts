import { ImageInfo } from "../models";

interface Error {
  status: number;
  error: string;
}

interface Ok {
  status: 200;
  results: ImageInfo[];
}

export default async function SearchImages(query: string): Promise<Error | Ok> {
  const res = await fetch(`/api/v1/search?q=${query}`);
  return await res.json();
}
