export default async function getImages(): Promise<Array<string>> {
  const res = await fetch("/api/v1/get-images");
  const data = await res.json();
  return data.images;
}
