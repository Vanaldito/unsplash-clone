import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));

import "./App.css";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Suspense>
  );
}
