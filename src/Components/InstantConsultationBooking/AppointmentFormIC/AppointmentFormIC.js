import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit, onSlotSelection }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, selectedSlot });
    setName('');
    setPhoneNumber('');
    setSelectedSlot(null);
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
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
          required
        />
      </div>
      {/* Agregamos un campo de selección de slot */}
      <div className="form-group">
        <label htmlFor="selectedSlot">Select a Slot:</label>
        <input
          type="text"
          id="selectedSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        />
      </div>
      {/* Llamamos a onSlotSelection cuando cambia el valor de selectedSlot */}
      <button type="button" onClick={() => onSlotSelection(selectedSlot)}>
        Select Slot
      </button>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
