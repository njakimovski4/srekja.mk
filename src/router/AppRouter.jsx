import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../ui/Navbar";
import Newsletter from "../pages/Newsletter";
import Shop from "../pages/Shop";
import Stories from "../pages/Stories";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/stories" element={<Stories />} />
        </Routes>
      </div>
    </Router>
  );
}
