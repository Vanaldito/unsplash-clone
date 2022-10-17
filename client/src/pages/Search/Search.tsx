import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Masonry, Navbar } from "../../components";
import { ImageInfo } from "../../models";
import { addImage, searchImages as search } from "../../services";

import "./Search.css";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const navigate = useNavigate();

  const [imagesInfo, setImagesInfo] = useState<Array<ImageInfo>>([]);

  useEffect(() => {
    if (!query) return;
    search(query).then(data => {
      if (data.status === 200 && "results" in data) {
        setImagesInfo(data.results);
      }
    });
  }, [query]);

  function uploadImage(imageLink: string, label: string) {
    addImage(imageLink, label).then(data => {
      if (data.status === 200) {
        setImagesInfo(info => [{ imageLink, label }, ...info]);
      }
    });
  }

  function searchImages(query: string) {
    navigate(`/search?q=${query}`);
  }

  return (
    <main className="search">
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
