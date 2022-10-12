import { Masonry, Navbar } from "./components";
import { images } from "./constants";

import "./App.css";

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <div className="masonry-container">
        <Masonry columns={3} breakPoint={700}>
          {images.map((image, index) => (
            <img src={image} key={index} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
