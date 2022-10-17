import { Router } from "express";
import { ImageInfo } from "../models";

const apiRouter = Router();

apiRouter.get("/get-images", (_req, res) => {
  ImageInfo.find({})
    .sort({ _id: -1 })
    .exec((err, docs) => {
      if (err) console.error(err);

      res.json({ images: docs });
    });
});

apiRouter.post("/upload-image", async (req, res) => {
  const imageLink = req.body.imageLink;
  const label = req.body.label;

  if (typeof imageLink !== "string" || typeof label !== "string")
    return res.status(400).json({ status: 400, error: "Data type not valid" });

  const URLRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  if (!URLRegex.test(imageLink))
    return res.status(400).json({ status: 400, error: "Image link not valid" });

  if (!label)
    return res
      .status(400)
      .json({ status: 400, error: "Empty label not allowed" });

  const imageInfo = new ImageInfo({
    imageLink,
    label,
  });
  await imageInfo.save();

  res.json({ status: 200 });
});

apiRouter.get("/search", async (req, res) => {
  const queryString = req.query.q?.toString();

  if (!queryString)
    return res
      .status(400)
      .json({ status: 400, error: "Query string not valid" });

  const results = await ImageInfo.find({
    label: {
      $regex: `${queryString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      $options: "i",
    },
  });

  return res.json({ status: 200, results });
});

export default apiRouter;
