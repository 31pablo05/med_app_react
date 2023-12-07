import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [showerr, setShowerr] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ya ha iniciado sesión al cargar el componente
    if (sessionStorage.getItem("auth-token")) {
      navigate("/"); // Redirigir a la página de inicio si ya ha iniciado sesión
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    try {
      // Llamada a la API para iniciar sesión
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await res.json();

      if (json.authtoken) {
        // Guardar el token de autenticación y otros detalles del usuario en sessionStorage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        // Redirigir a la página de inicio
        navigate('/');
        window.location.reload();
      } else {
        // Mostrar mensajes de error
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error);
        }
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      // Manejar el error de manera apropiada (puede mostrar un mensaje de error al usuario, por ejemplo)
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            ¿Eres un nuevo miembro?{' '}
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>
              {/* Otros campos del formulario, si es necesario */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
