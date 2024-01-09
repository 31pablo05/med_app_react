import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppointmentForm from '../AppoinmetnForm/AppoinmentForm';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';

const DoctorCard = ({ name, speciality, experience, clinic, ratings, profilePic, location }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);

    // Check if appointment data exists in localStorage
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem(name));
        if (storedAppointments) {
            setAppointments(storedAppointments);
        }
    }, [name]);

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        localStorage.setItem(name, JSON.stringify(updatedAppointments));
        // Remove item from localStorage
        if (updatedAppointments.length === 0) {
            localStorage.removeItem(name);
            localStorage.removeItem("doctorData");
        }
        console.log("cancel clicked");
        // Show a confirmation message instead of immediately reloading the page
        // You can use state to manage the message display
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData
        };
        const doctorData = {
            name: name,
            speciality: speciality,
        };
        localStorage.setItem('doctorData', JSON.stringify(doctorData));
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        localStorage.setItem(name, JSON.stringify(updatedAppointments));
        setShowModal(false);
        // Show a success message or handle the UI accordingly
    };

    return (
        <div className="doctor-card-container">
            <Link to={`/doctor-details/${name}`} className={`doctor-card-link ${appointments.length > 0 ? 'active' : ''}`}>
                <div className="doctor-card-details-container">
                    <div className="doctor-card-profile-image-container">
                        <img src={profilePic} alt={name} />
                    </div>
                    <div className="doctor-card-details">
                        <div className="doctor-card-detail-name">{name}</div>
                        <div className="doctor-card-detail-speciality">{speciality}</div>
                        <div className="doctor-card-detail-experience">{experience} years experience</div>
                        <div className="doctor-card-detail-location">{location}</div>
                        <div className="doctor-card-detail-clinic">{clinic}</div>
                        <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                    </div>
                    <Popup
                        style={{ backgroundColor: '#FFFFFF' }}
                        trigger={
                            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
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
                            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll', backgroundColor: 'white' }}>
                                {/* Content of Popup */}
                                {/* ... */}
                            </div>
                        )}
                    </Popup>
                </div>
            </Link>
        </div>
    );
};

export default DoctorCard;
