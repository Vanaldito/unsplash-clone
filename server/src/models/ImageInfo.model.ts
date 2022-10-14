import { Schema, model, Document } from "mongoose";

interface ImageInfoI extends Document {
  imageLink: string;
  label: string;
}

const imageInfoSchema = new Schema<ImageInfoI>(
  {
    imageLink: String,
    label: String,
  },
  { collection: "images info" }
);

const ImageInfo = model<ImageInfoI>("ImageInfo", imageInfoSchema);

export default ImageInfo;
