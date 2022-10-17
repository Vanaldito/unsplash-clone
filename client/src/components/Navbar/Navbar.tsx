import { Link } from "react-router-dom";
import { AddImageButton } from "../AddImageButton";
import { SearchBar } from "../SearchBar";

import "./Navbar.css";

interface NavbarProps {
  uploadImage: (imageLink: string, label: string) => void;
}

export default function Navbar({ uploadImage }: NavbarProps) {
  return (
    <nav className="navbar">
      <Link className="navbar__logo" to="/">
        <img src="/unsplash-logo.svg" />
      </Link>
      <SearchBar />
      <AddImageButton uploadImage={uploadImage} />
    </nav>
  );
}
