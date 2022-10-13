import { Router } from "express";
import { ImageInfo } from "../models";

const apiRouter = Router();

const images: Array<ImageInfo> = [
  {
    label: "Flowers",
    imageLink:
      "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
  },
  {
    label: "Landscape",
    imageLink:
      "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
  },
  {
    label: "Apple",
    imageLink:
      "https://imgsrv2.voi.id/Vkynu2YrQM1QhsDaTiKIuOakhnqIbRX6OaIjw-JJ55c/fill/298/528/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zNDIwMC8yMDIxMDIxOTE0MTctbWFpbi5jcm9wcGVkXzE2MTM3MjI4MzEuanBn.jpg",
  },
  {
    label: "Sun",
    imageLink:
      "https://i.natgeofe.com/n/2f169ccb-e943-4772-8bd1-c92e79db64ab/gsfc_20171208_archive_e000922_orig.jpg?w=636&h=636",
  },
  {
    label: "An IA generated image",
    imageLink:
      "https://openailabsprodscus.blob.core.windows.net/private/user-74YsbCzIgOUJxz9jsrAAWeMO/generations/generation-dAPcy5t031XAfAyVU2INzJVZ/image.webp?st=2022-10-13T19%3A53%3A33Z&se=2022-10-13T21%3A51%3A33Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-13T20%3A37%3A38Z&ske=2022-10-20T20%3A37%3A38Z&sks=b&skv=2021-08-06&sig=mxvo7C%2BmwgZ/AtFNZ5RsOmdgpqqZn/jCU5cD56zSfps%3D",
  },
  {
    label: "Komodo dragons",
    imageLink:
      "https://media.springernature.com/relative-r300-703_m1050/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg",
  },
];

apiRouter.get("/get-images", (_req, res) => {
  res.json({ images });
});

apiRouter.post("/upload-image", (req, res) => {
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

  images.unshift({ imageLink, label });

  res.json({ status: 200 });
});

export default apiRouter;
