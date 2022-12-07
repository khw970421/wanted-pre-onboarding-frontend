import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAndRegister, NotFound } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        {/* <Route path="/imagedrag" element={<ImageDragPage />} /> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
