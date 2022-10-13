import React, { useState } from "react";
import { Modal } from "../Modal";
import "./Navbar.css";

interface NavbarProps {
  uploadImage: (imageLink: string) => void;
}

export default function Navbar({ uploadImage }: NavbarProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLink, setImageLink] = useState("");

  function clickHandler() {
    setDisplayModal(true);
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setImageLink(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    imageLink && uploadImage(imageLink);

    closeModal();
  }

  function closeModal() {
    setDisplayModal(false);
    setImageLink("");
  }

  return (
    <nav className="navbar">
      <a className="navbar__logo" href="/">
        <img src="/unsplash-logo.svg" />
      </a>
      <form className="navbar__search-bar">
        <button className="navbar__search-button" type="submit">
          Search
        </button>
        <input
          className="navbar__search-field"
          type="text"
          placeholder="Search by name"
        />
      </form>
      <button
        className="navbar__add-photo"
        type="button"
        onClick={clickHandler}
      >
        Add photo
      </button>
      {displayModal && (
        <Modal closeModal={closeModal}>
          <h2 className="navbar__add-photo-title">Add a new photo</h2>
          <form onSubmit={submitHandler} className="navbar__add-photo-form">
            <label className="navbar__add-photo-label">
              Photo URL
              <input
                type="text"
                onChange={changeHandler}
                className="navbar__add-photo-field"
                placeholder="https://images.unsplash.com/photo-1665499403166-8ad7d367a43b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              />
            </label>
            <div className="navbar__add-photo-buttons">
              <button
                className="navbar__add-photo-button--secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="navbar__add-photo-button--primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </nav>
  );
}
