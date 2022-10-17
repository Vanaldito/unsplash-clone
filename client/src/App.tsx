import { Route, Routes } from "react-router-dom";
import { Home, Search } from "./pages";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
