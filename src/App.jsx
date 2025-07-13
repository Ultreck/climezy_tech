// Folder: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CityDetails from "./pages/CityDetails";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;
const App = () => {
  useEffect(() => {
    getUserIPAndTrack();
  }, []);

  const getUserIPAndTrack = async () => {
    try {
      const res = await fetch(`${apiUrl}`);
      if (!res.ok) return;

      const data = await res.json();

      const dataInfo = {
        ip: data?.ip,
        appName: appName,
        countryName: data?.country_name,
        countryCode: data?.country_code,
      };

      await axios.post(`${baseUrl}/app/tracking`, dataInfo);
      console.log("IP successfully posted");
      window.localStorage.setItem("visitedOnce", JSON.stringify("true"));
    } catch (error) {
      console.error("Tracking error:", error);
    }
  };

  return (
    <AppProvider>
      {/* <Navbar/> */}
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:name" element={<CityDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
};

export default App;
