import { useState, useEffect } from "react";
import "./App.css";
import Authentification from "./pages/Authentification";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Authentification />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
