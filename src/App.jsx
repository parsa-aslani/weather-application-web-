import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Error404 from "./components/Error404";
import { Bounce, ToastContainer } from "react-toastify";
import { useState } from "react";

const App = () => {
  const [weather, setweather] = useState(null);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorite"
          element={<Favorite setweather={setweather} weather={weather} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
export default App;
