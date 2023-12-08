// DoctorCardIC.js
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';  // Asegúrate de tener un archivo CSS asociado
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

// Puedes considerar un componente de icono personalizado
const CustomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  const handleSlotSelection = (selectedSlot) => {
    // Lógica para manejar la selección de slots
    console.log('Selected Slot:', selectedSlot);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <CustomIcon />
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment-btn' : ''}`} onClick={handleBooking}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="modal-container" style={{ height: '100vh', overflow: 'scroll' }}>
              <div className="modal-content">
                {/* Contenido del modal */}
              </div>
              <button className="modal-btn" onClick={close}>
                Close
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;
