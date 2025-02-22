import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Newsletter", path: "/newsletter" },
    { name: "Shop", path: "/shop" },
    { name: "Stories", path: "/stories" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-lg shadow-lg rounded-full px-6 py-3 flex space-x-6 z-50 border border-white/40">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`text-lg font-medium ${
            location.pathname === item.path
              ? "text-blue-600"
              : "text-gray-800 hover:text-blue-500"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
