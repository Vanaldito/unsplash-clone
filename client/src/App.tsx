import { useEffect, useState } from "react";
import { Image, Masonry, Navbar } from "./components";
import { addImage, getImages } from "./services";

import "./App.css";

export default function App() {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    getImages().then(images => setImages(images));
  }, []);

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
            <Image src={image} key={index} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
