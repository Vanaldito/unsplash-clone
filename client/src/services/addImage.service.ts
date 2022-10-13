interface addImageResponse {
  status: number;
  error?: string;
}

export default async function addImage(
  imageLink: string
): Promise<addImageResponse> {
  const res = await fetch("/api/v1/upload-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageLink }),
  });
  return await res.json();
}
