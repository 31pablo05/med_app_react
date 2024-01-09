import React, { useEffect, useState, useCallback } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const navigate = useNavigate();

    const getDoctorsDetails = useCallback(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                    window.location.reload();  // Fix: Use window.location.reload()
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                setDoctors(data);
            })
            .catch(err => console.log(err));
    }, [searchParams]);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );

            setFilteredDoctors(filtered);
            setIsSearched(true);
            // window.location.reload(); // Check if this is necessary
        }
    };

    useEffect(() => {
        // Función interna para utilizar las variables en el efecto
        const fetchDataAndNavigate = async () => {
            await getDoctorsDetails();
            // Puedes utilizar navigate aquí si es necesario
            // navigate('/otra-ruta');
        };

        fetchDataAndNavigate();
    }, [searchParams, getDoctorsDetails, navigate]);  // Solo se incluye searchParams en el array 

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearch onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />)
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </center>
    );
}

export default BookingConsultation;
