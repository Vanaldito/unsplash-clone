import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Image, Loader, Masonry, Navbar } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ImageInfo } from "../../models";
import { addImage, searchImages } from "../../services";

import "./Search.css";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { loading, callEndpoint } = useFetchAndLoad();

  const [imagesInfo, setImagesInfo] = useState<Array<ImageInfo>>([]);

  useEffect(() => {
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
  }, [query]);

  function uploadImage(imageLink: string, label: string) {
    callEndpoint(addImage(imageLink, label))
      .then<{ status: number; error?: string }>(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setImagesInfo(info => [{ imageLink, label }, ...info]);
        }
      });
  }

  return (
    <main className="search">
      <Navbar uploadImage={uploadImage} />
      {loading ? (
        <Loader />
      ) : (
        <div className="masonry-container">
          <Masonry columns={3} breakPoint={700}>
            {imagesInfo.map((info, index) => (
              <Image src={info.imageLink} label={info.label} key={index} />
            ))}
          </Masonry>
        </div>
      )}
    </main>
  );
}
