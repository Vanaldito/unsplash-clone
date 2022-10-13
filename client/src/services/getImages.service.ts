import { ImageInfo } from "../models";

export default async function getImages(): Promise<Array<ImageInfo>> {
  const res = await fetch("/api/v1/get-images");
  const data = await res.json();
  return data.images;
}
