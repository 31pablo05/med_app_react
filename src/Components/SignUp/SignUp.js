import React, { useState } from 'react';
import './SignUp.css'; // Import your CSS file

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if the name is at least 4 characters
    if (name.length < 4) {
      setNameError('Name should be at least 4 characters');
      return;
    } else {
      setNameError('');
    }

    // Validation: Check if the email is valid
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Validation: Check if the phone number has exactly 10 digits
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneError('Phone number must have exactly 10 digits');
      return;
    } else {
      setPhoneError('');
    }

    // Validation: Check if the password has at least 8 characters
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }

    // If all validations are successful, you can proceed with form submission
    // Make a POST request to the registration endpoint
    try {
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
        // Registration successful
        setRegistrationSuccess(true);
      } else {
        // Registration failed, handle errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className={`form-group ${nameError ? 'has-error' : ''}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                aria-describedby="helpId"
              />
              {nameError && (
                <div className="invalid-feedback" style={{ color: 'red' }}>
                  {nameError}
                </div>
              )}
            </div>
            <div className={`form-group ${emailError ? 'has-error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                aria-describedby="helpId"
              />
              {emailError && (
                <div className="invalid-feedback" style={{ color: 'red' }}>
                  {emailError}
                </div>
              )}
            </div>
            <div className={`form-group ${phoneError ? 'has-error' : ''}`}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setPhoneError('');
                }}
                aria-describedby="helpId"
              />
              {phoneError && (
                <div className="invalid-feedback" style={{ color: 'red' }}>
                  {phoneError}
                </div>
              )}
            </div>
            <div className={`form-group ${passwordError ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                aria-describedby="helpId"
              />
              {passwordError && (
                <div className="invalid-feedback" style={{ color: 'red' }}>
                  {passwordError}
                </div>
              )}
            </div>
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
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
