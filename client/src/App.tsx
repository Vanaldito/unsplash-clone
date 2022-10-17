import { useEffect, useState } from "react";
import { Image, Masonry, Navbar } from "./components";
import { addImage, getImages, searchImages as search } from "./services";
import { ImageInfo } from "./models";

import "./App.css";

export default function App() {
  const [imagesInfo, setImagesInfo] = useState<Array<ImageInfo>>([]);

  useEffect(() => {
    getImages().then(info => setImagesInfo(info));
  }, []);

  function uploadImage(imageLink: string, label: string) {
    addImage(imageLink, label).then(data => {
      if (data.status === 200) {
        setImagesInfo(info => [{ imageLink, label }, ...info]);
      }
    });
  }

  function searchImages(query: string) {
    search(query).then(data => {
      if (data.status === 200 && "results" in data) {
        setImagesInfo(data.results);
      }
    });
  }

  return (
    <main className="app">
      <Navbar uploadImage={uploadImage} searchImages={searchImages} />
      <div className="masonry-container">
        <Masonry columns={3} breakPoint={700}>
          {imagesInfo.map((info, index) => (
            <Image src={info.imageLink} label={info.label} key={index} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
