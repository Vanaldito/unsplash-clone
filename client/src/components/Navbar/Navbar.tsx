import "./Navbar.css";

interface NavbarProps {
  uploadImage: (imageLink: string) => void;
}

export default function Navbar({ uploadImage }: NavbarProps) {
  function clickHandler() {
    const link = prompt("Image Link");

    link && uploadImage(link);
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
    </nav>
  );
}
