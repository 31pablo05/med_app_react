import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    // Limpiar la información del usuario y cerrar la sesión
    setUser(null);
    // Limpiar el usuario almacenado en localStorage al cerrar la sesión
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
        <i className="fa fa-user-md" style={{ color: "#2190FF" }}></i>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={toggleMobileMenu}>
        <i className={isMobileMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={isMobileMenuOpen ? "nav__links active" : "nav__links"}>
        {/* ... Otras opciones del menú ... */}
        {user ? (
          <>
            <li className="link">
              Welcome, {user.username}
            </li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
