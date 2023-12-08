import React, { useState } from 'react';
import './SignUp.css'; // Importa tu archivo CSS

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... Validaciones existentes ...

    // Si todas las validaciones son exitosas, puedes proceder con el envío del formulario
    try {
      setLoading(true); // Indica que la solicitud está en progreso

      const response = await fetch("https://pabloprobost-3000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phoneNumber,
          password: password,
        }),
      });

      if (response.ok) {
        // Registro exitoso
        setRegistrationSuccess(true);
        // Puedes realizar alguna acción adicional, como redirigir al usuario o mostrar un mensaje
      } else {
        // Registro fallido, maneja los errores
        console.error('Registro fallido');
        // Puedes mostrar un mensaje de error específico según la respuesta del servidor
        const data = await response.json();
        console.error('Error del servidor:', data.message);
      }
    } catch (error) {
      // Error en la solicitud, maneja de manera adecuada
      console.error('Error:', error);
    } finally {
      setLoading(false); // Indica que la solicitud ha terminado (ya sea éxito o error)
    }
  };

  // ... Función para validar el formato del correo electrónico ...

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            {/* ... Campos de entrada existentes ... */}
            <div className="btn-group">
              <button
                type="submit"
                className={`btn btn-primary mb-2 mr-1 waves-effect waves-light ${loading ? 'disabled' : ''}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
          </form>
          {registrationSuccess && (
            <div className="success-message">Registration successful!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
