import React, { useState } from 'react';

const AppointmentForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phoneNumber, date, time });
        setName('');
        setPhoneNumber('');
        setDate('');
        setTime('');
        // You can also use selectedSlot in the form submission if needed.
        console.log(`Selected Slot: ${selectedSlot}`);
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
            <div className="form-group">
                <label htmlFor="date">Date of Appointment:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="time">Book Time Slot:</label>
                <select
                    id="time"
                    value={time}
                    onChange={(e) => {
                        setTime(e.target.value);
                        handleSlotSelection(e.target.value);
                    }}
                    required
                >
                    <option value="">Select a time slot</option>
                    <option value="9:00 AM">9:00 AM</option>
                    {/* ...other time slot options */}
                </select>
                {selectedSlot && (
                    <p>Selected Time: {selectedSlot}</p>
                )}
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentForm;
