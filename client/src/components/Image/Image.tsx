import { useState } from "react";
import { Loader } from "../Loader";
import "./Image.css";

interface ImageProps {
  src: string;
  label: string;
}

export default function Image({ src, label }: ImageProps) {
  const [loading, setLoading] = useState(true);

  function errorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const current = event.target as HTMLImageElement;

    const defaultImageRelativeURL = "/default-image.svg";

    const currentIsDefaultImage =
      current.src ===
        `${location.protocol}//${location.host}${defaultImageRelativeURL}` ||
      current.src === defaultImageRelativeURL;

    if (!currentIsDefaultImage) {
      current.src = defaultImageRelativeURL;
    }
  }

  return (
    <div className="image-container">
      {loading && <Loader />}
      <img
        className={`image${loading ? " image--loading" : ""}`}
        src={src}
        onError={errorHandler}
        onLoad={() => setLoading(false)}
      />
      <div className="image-hover">
        <span className="image-hover__label">{label}</span>
      </div>
    </div>
  );
}
