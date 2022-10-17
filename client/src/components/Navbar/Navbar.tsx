import React, { useRef, useState } from "react";
import AddImageButton from "../AddImageButton/AddImageButton";

import "./Navbar.css";

interface NavbarProps {
  uploadImage: (imageLink: string, label: string) => void;
  searchImages: (query: string) => void;
}

export default function Navbar({ uploadImage, searchImages }: NavbarProps) {
  const [query, setQuery] = useState("");

  const input = useRef<HTMLInputElement>(null);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function clickHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!query) {
      event?.preventDefault();
      return input.current?.focus();
    }
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query) return;

    searchImages(query);

    setQuery("");
  }

  return (
    <nav className="navbar">
      <a className="navbar__logo" href="/">
        <img src="/unsplash-logo.svg" />
      </a>
      <form className="navbar__search-bar" onSubmit={submitHandler}>
        <button
          className="navbar__search-button"
          type="submit"
          onClick={clickHandler}
        >
          Search
        </button>
        <input
          ref={input}
          onChange={changeHandler}
          className="navbar__search-field"
          type="text"
          placeholder="Search by name"
        />
      </form>
      <AddImageButton uploadImage={uploadImage} />
    </nav>
  );
}
