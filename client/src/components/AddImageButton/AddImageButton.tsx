import { useState } from "react";
import { Modal } from "../Modal";

import "./AddImageButton.css";

interface AddImageButtonProps {
  uploadImage: (imageLink: string) => void;
}

export default function AddImageButton({ uploadImage }: AddImageButtonProps) {
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
    <>
      <button className="add-photo-button" type="button" onClick={clickHandler}>
        Add photo
      </button>
      {displayModal && (
        <Modal closeModal={closeModal}>
          <h2 className="add-photo__title">Add a new photo</h2>
          <form onSubmit={submitHandler} className="add-photo__form">
            <label className="add-photo__label">
              Photo URL
              <input
                type="text"
                onChange={changeHandler}
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
