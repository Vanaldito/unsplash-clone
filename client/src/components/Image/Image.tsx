import "./Image.css";

interface ImageProps {
  src: string;
  label: string;
}

export default function Image({ src, label }: ImageProps) {
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
      <img className="image" src={src} onError={errorHandler} />
      <div className="image-hover">
        <span className="image-hover__label">{label}</span>
      </div>
    </div>
  );
}
