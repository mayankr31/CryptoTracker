import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { CoinPage } from "./pages/CoinPage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CryptoContext from "./CryptoContext.jsx";
import 'react-alice-carousel/lib/alice-carousel.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="coins/:id" element={<CoinPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoContext>
      <RouterProvider router={router} />
    </CryptoContext>
  </StrictMode>
);
