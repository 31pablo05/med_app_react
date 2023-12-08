import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit, onSlotSelection }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number (e.g., 123-456-7890).');
      return;
    }

    onSubmit({ name, phoneNumber, selectedSlot });
    setName('');
    setPhoneNumber('');
    setSelectedSlot('');
    setError('');
  };

  const isValidPhoneNumber = (number) => {
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return phonePattern.test(number);
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="selectedSlot">Select a Slot:</label>
        <input
          type="text"
          id="selectedSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        />
      </div>
      <button type="button" onClick={() => onSlotSelection(selectedSlot)}>
        Select Slot
      </button>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
