import React, { useState } from "react";

import Search from "./Pages/Search";
import LoginSignup from "./Pages/LoginSignup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/images" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
