import { useState } from "react";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { Modal } from "../Modal";
import "./Image.css";

interface ImageProps {
  src: string;
  label: string;
  deleteImage: (password: string) => void;
}

export default function Image({ src, label, deleteImage }: ImageProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");

  function errorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const current = event.target as HTMLImageElement;

    const defaultImageRelativeURL = "/default-image.svg";

    const currentIsDefaultImage =
      current.src ===
        `${location.protocol}//${location.host}${defaultImageRelativeURL}` ||
      current.src === defaultImageRelativeURL;

    if (!currentIsDefaultImage) {
      current.src = defaultImageRelativeURL;
    }
  }

  function clickHandler() {
    setDisplayModal(true);
  }

  function closeModal() {
    setDisplayModal(false);

    setPassword("");
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    password && deleteImage(password);

    closeModal();
  }

  return (
    <>
      <div className="image-container">
        {loading && <Loader />}
        <img
          className={`image${loading ? " image--loading" : ""}`}
          src={src}
          onError={errorHandler}
          onLoad={() => setLoading(false)}
        />
        <div className="image-hover">
          <span className="image-hover__delete">
            <Button color="delete" type="button" onClick={clickHandler}>
              Delete
            </Button>
          </span>
          <span className="image-hover__label">{label}</span>
        </div>
      </div>
      {displayModal && (
        <Modal closeModal={closeModal}>
          <h2 className="delete-image__title">Are you sure?</h2>
          <form className="delete-image__form" onSubmit={submitHandler}>
            <label className="delete-image__label">
              Password
              <input
                type="password"
                onChange={changePassword}
                className="delete-image__field"
                placeholder="************************"
              />
            </label>
            <div className="delete-image__buttons">
              <Button color="secondary" type="button" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="danger" type="submit">
                Delete
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
