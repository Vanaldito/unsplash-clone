import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const input = useRef<HTMLInputElement>(null);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function clickHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!query) {
      event.preventDefault();
      return input.current?.focus();
    }
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query) return;

    navigate(`/search?q=${query}`);
  }

  return (
    <form className="search-bar" onSubmit={submitHandler}>
      <button
        className="search-bar__button"
        type="submit"
        onClick={clickHandler}
      >
        Search
      </button>
      <input
        ref={input}
        onChange={changeHandler}
        className="search-bar__field"
        type="text"
        placeholder="Search by name"
      />
    </form>
  );
}
