import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Pages/Details";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="details" element={<Details/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
