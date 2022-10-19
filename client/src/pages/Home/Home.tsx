import { useEffect, useState } from "react";
import { Image, Loader, Masonry, Navbar } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ImageInfo } from "../../models";
import { addImage, deleteImage, getImages } from "../../services";

import "./Home.css";

export default function Home() {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [imagesInfo, setImagesInfo] = useState<Array<ImageInfo>>([]);

  useEffect(loadImages, []);

  function loadImages() {
    callEndpoint(getImages())
      .then<{ images: Array<ImageInfo> }>(res => res.json())
      .then(data => setImagesInfo(data.images));
  }

  function uploadImage(imageLink: string, label: string) {
    callEndpoint(addImage(imageLink, label))
      .then<{ status: number; error?: string }>(res => res.json())
      .then(data => {
        if (data.status === 200) {
          loadImages();
        }
      });
  }

  function removeImage(id: string) {
    return (password: string) => {
      callEndpoint(deleteImage(id, password))
        .then<{
          status: number;
          error?: string;
        }>(res => res.json())
        .then(data => {
          if (data.status === 200) {
            loadImages();
          }
        });
    };
  }

  return (
    <main className="home">
      <Navbar uploadImage={uploadImage} />
      {loading ? (
        <Loader />
      ) : (
        <div className="masonry-container">
          <Masonry columns={3} breakPoint={700}>
            {imagesInfo.map(info => (
              <Image
                src={info.imageLink}
                label={info.label}
                deleteImage={removeImage(info._id)}
                key={info._id}
              />
            ))}
          </Masonry>
        </div>
      )}
    </main>
  );
}
