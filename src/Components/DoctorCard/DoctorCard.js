import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';

const DoctorCard = ({ name, speciality, experience, clinic, ratings, profilePic }) => {
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
        // remove item from localStorage
        if (updatedAppointments.length === 0) {
            localStorage.removeItem(name);
            localStorage.removeItem("doctorData");
        }
        console.log("cancel clicked");
        window.location.reload();
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
        window.location.reload();

    };
    return (

        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    <img src={profilePic} alt={name} />
                </div>
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    {/* <div className="doctor-card-detail-location">{location}</div> */}
                    {/* <div className="doctor-card-detail-clinic">Stay healthy</div> */}
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
                            <div>
                                <div className="doctor-card-profile-image-container">
                                    <img src={profilePic} alt={name} />
                                </div>
                                <div className="doctor-card-details">
                                    <div className="doctor-card-detail-name">{name}</div>
                                    <div className="doctor-card-detail-speciality">{speciality}</div>
                                    <div className="doctor-card-detail-experience">{experience} years experience </div>
                                    {/* <div className="doctor-card-detail-location">{location}</div>/ */}
                                    <div className="doctor-card-detail-clinic">{clinic}</div>
                                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                                </div>
                            </div>

                            {appointments.length > 0 ? (
                                <>
                                    <input type="text" />
                                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                                    {appointments.map(appointment => (
                                        // <center>
                                        <div className="bookedInfo" key={appointment.id}>
                                            <p>Name: {appointment.name}</p>
                                            <p>Phone Number: {appointment.phoneNumber}</p>
                                            <p>Date of Appointment: {appointment.date}</p>
                                            <p>Time Slot: {appointment.time}</p>
                                            <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                        </div>
                                        // </center>
                                    ))}
                                </>
                            ) : (
                                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                            )}
                        </div>
                    )}
                </Popup>
            </div>

        </div>
    );
};

export default DoctorCard;