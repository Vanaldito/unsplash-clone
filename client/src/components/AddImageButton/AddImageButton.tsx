import { useState } from "react";
import { Modal } from "../Modal";

import "./AddImageButton.css";

interface AddImageButtonProps {
  uploadImage: (imageLink: string, label: string) => void;
}

export default function AddImageButton({ uploadImage }: AddImageButtonProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [label, setLabel] = useState("");

  function clickHandler() {
    setDisplayModal(true);
  }

  function changeImageLink(event: React.ChangeEvent<HTMLInputElement>) {
    setImageLink(event.target.value);
  }

  function changeLabel(event: React.ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    imageLink && label && uploadImage(imageLink, label);

    closeModal();
  }

  function closeModal() {
    setDisplayModal(false);
    setImageLink("");
    setLabel("");
  }

  return (
    <>
      <button className="add-photo-button" type="button" onClick={clickHandler}>
        Add photo
      </button>
      {displayModal && (
        <Modal closeModal={closeModal}>
          <h2 className="add-photo__title">Add a new photo</h2>
          <form onSubmit={submitHandler} className="add-photo__form">
            <label className="add-photo__label">
              Label
              <input
                type="text"
                onChange={changeLabel}
                className="add-photo__field"
                placeholder="A beautiful landscape"
              />
            </label>
            <label className="add-photo__label">
              Photo URL
              <input
                type="text"
                onChange={changeImageLink}
                className="add-photo__field"
                placeholder="https://images.unsplash.com/photo-1665499403166-8ad7d367a43b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              />
            </label>
            <div className="add-photo__buttons">
              <button
                className="add-photo__button--secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="add-photo__button--primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
