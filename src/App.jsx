import { useState } from "react";

import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
        <Navbar />
      <div className="Content">
        <Form />
      </div>
        <Footer />
    </div>
  );
}

export default App;
