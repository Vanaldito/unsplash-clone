import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Image, Loader, Masonry, Navbar } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ImageInfo } from "../../models";
import { addImage, deleteImage, searchImages } from "../../services";

import "./Search.css";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { loading, callEndpoint } = useFetchAndLoad();

  const [imagesInfo, setImagesInfo] = useState<Array<ImageInfo>>([]);

  useEffect(loadResults, [query]);

  function loadResults() {
    if (!query) return;

    callEndpoint(searchImages(query))
      .then<
        | { status: number; error: string }
        | { status: number; results: Array<ImageInfo> }
      >(res => res.json())
      .then(data => {
        if (data.status === 200 && "results" in data) {
          setImagesInfo(data.results);
        }
      });
  }

  function uploadImage(imageLink: string, label: string) {
    callEndpoint(addImage(imageLink, label))
      .then<{ status: number; error?: string }>(res => res.json())
      .then(data => {
        if (data.status === 200) {
          loadResults();
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
            loadResults();
          }
        });
    };
  }

  return (
    <main className="search">
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
