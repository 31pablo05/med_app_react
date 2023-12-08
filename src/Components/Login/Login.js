import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Importa tu archivo CSS

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // Realiza una solicitud POST a tu backend para la autenticación del usuario
      const response = await fetch('https://tu-backend-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    // Maneja el cierre de sesión del usuario, por ejemplo, limpiando los datos del usuario y la sesión
    setUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      {user ? (
        <div className="login-success">
          <h2>Welcome, {user.name}!</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{' '}
            <span>
              {/* Utiliza un enlace de React para la navegación interna */}
              <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={handleLogin}>
              {error && <div className="error">{error}</div>}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Login
                </button>
                <button
                  type="reset"
                  className="btn btn-danger waves-effect waves-light"
                >
                  Reset
                </button>
              </div>
              <br />
              <div className="login-text">
                {/* Agrega un enlace o mensaje para la recuperación de contraseña */}
                <Link to="/forgot-password" style={{ color: '#2190FF' }}>
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
