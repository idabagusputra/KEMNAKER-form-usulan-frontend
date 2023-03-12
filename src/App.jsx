import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";
import RegisterPage from "./pages/RegisterPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex items-center content-center w-full">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
