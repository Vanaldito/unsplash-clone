import React, { useEffect, useState } from "react";
import { Masonry, Navbar } from "./components";
import { addImage, getImages } from "./services";

import "./App.css";

export default function App() {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    getImages().then(images => setImages(images));
  }, []);

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

  function uploadImage(imageLink: string) {
    addImage(imageLink).then(data => {
      if (data.status === 200) {
        setImages(images => [imageLink, ...images]);
      }
    });
  }

  return (
    <main className="app">
      <Navbar uploadImage={uploadImage} />
      <div className="masonry-container">
        <Masonry columns={3} breakPoint={700}>
          {images.map((image, index) => (
            <img src={image} key={index} onError={errorHandler} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
