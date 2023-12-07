import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Limpiar datos del usuario y cerrar sesión
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    // Eliminar otros datos del usuario si es necesario

    // Actualizar el estado para reflejar el estado de cierre de sesión del usuario
    setIsLoggedIn(false);
    setUsername("");

    // Redirigir a la página de inicio
    navigate("/");
  };

  useEffect(() => {
    // Comprobar si el usuario ha iniciado sesión
    const storedUsername = sessionStorage.getItem("name");

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
        <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        {/* Otras opciones del menú */}
        {isLoggedIn ? (
          <>
            <li className="link">
              Welcome, {username}
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
