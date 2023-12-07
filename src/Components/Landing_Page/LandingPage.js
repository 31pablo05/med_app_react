import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const Landing_Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión al cargar la página
    if (!sessionStorage.getItem("auth-token")) {
      navigate("/login"); // Redirigir al inicio de sesión si el usuario no ha iniciado sesión
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar datos de usuario y cerrar sesión
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    
    // Redirigir a la página de inicio de sesión después del cierre de sesión
    navigate("/login");
  };

  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1>
            Your Health<br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at
            quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
          </h4>
          <Link to="#services">
            <button className="button">Get Started</button>
          </Link>
          <div>
            {/* Enlace para cerrar sesión */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page;
