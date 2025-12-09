import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./global.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
