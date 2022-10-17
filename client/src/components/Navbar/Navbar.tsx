import { AddImageButton } from "../AddImageButton";
import { SearchBar } from "../SearchBar";

import "./Navbar.css";

interface NavbarProps {
  uploadImage: (imageLink: string, label: string) => void;
}

export default function Navbar({ uploadImage }: NavbarProps) {
  return (
    <nav className="navbar">
      <a className="navbar__logo" href="/">
        <img src="/unsplash-logo.svg" />
      </a>
      <SearchBar />
      <AddImageButton uploadImage={uploadImage} />
    </nav>
  );
}
