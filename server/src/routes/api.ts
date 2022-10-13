import { Router } from "express";

const apiRouter = Router();

const images: Array<string> = [
  "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401__340.jpg",
  "https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964__340.jpg",
  "https://images.unsplash.com/photo-1665485653015-7d1eb30e1e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1665425210782-ec30b861eea8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://plus.unsplash.com/premium_photo-1663099579196-1b39365eb244?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661956603025-8310b2e3036d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1665509862441-4712c137e8a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1665509867116-917568864ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1665512594386-051aad8b9f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1665512983203-8421eae182b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1665499403166-8ad7d367a43b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
];

apiRouter.get("/get-images", (_req, res) => {
  res.json({ images });
});

apiRouter.post("/upload-image", (req, res) => {
  const imageLink = req.body.imageLink;

  if (typeof imageLink !== "string")
    return res.status(400).json({ status: 400, error: "Image link not valid" });

  if (
    !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
      imageLink
    )
  )
    return res.status(400).json({ status: 400, error: "Image link not valid" });

  images.unshift(imageLink);

  res.json({ status: 200 });
});

export default apiRouter;
