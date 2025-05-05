// Folder: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CityDetails from "./pages/CityDetails";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

const App = () => (
  <AppProvider>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:name" element={<CityDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    <Toaster position="top-center" richColors /> 
  </AppProvider>
);

export default App;