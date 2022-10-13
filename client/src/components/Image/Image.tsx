interface ImageProps {
  src: string;
}

export default function Image({ src }: ImageProps) {
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

  return <img src={src} onError={errorHandler} />;
}
