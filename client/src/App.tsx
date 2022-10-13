import { useEffect, useState } from "react";
import { Masonry, Navbar } from "./components";
import { getImages } from "./services";

import "./App.css";

export default function App() {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    getImages().then(images => setImages(images));
  }, []);

  return (
    <main className="app">
      <Navbar />
      <div className="masonry-container">
        <Masonry columns={3} breakPoint={700}>
          {images.map((image, index) => (
            <img src={image} key={index} onLoad={() => console.log("Hi")} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
