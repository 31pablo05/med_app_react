// FindDoctorSearchIC.js
import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

// Componente reutilizable para un elemento de resultado de búsqueda
const SearchDoctorResultItem = ({ speciality, onSelect }) => (
  <div className="search-doctor-result-item" onMouseDown={() => onSelect(speciality)}>
    <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: "10px", width: "10px" }} width="12" /></span>
    <span>{speciality}</span>
    <span>SPECIALITY</span>
  </div>
);

const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const navigate = useNavigate();
  const [specialities, setSpecialities] = useState(initSpeciality);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${speciality}`);

    // Ejemplo de uso de setSpecialities
    setSpecialities((prevSpecialities) => {
      // Realiza alguna lógica para actualizar specialities según tus necesidades
      const updatedSpecialities = [...prevSpecialities, 'NewSpeciality'];
      return updatedSpecialities;
    });
  };

  return (
    <div className='finddoctor'>
      <div className="home-search-container">
        <div className="doctor-search-box">
          <input
            type="text"
            className="search-doctor-input-box"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setDoctorResultHidden(false)}
            onBlur={() => setDoctorResultHidden(true)}
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
          <div className="findiconimg">
            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
          </div>
          <div className="search-doctor-input-results" hidden={doctorResultHidden}>
            {specialities.map((speciality) => (
              <SearchDoctorResultItem key={speciality} speciality={speciality} onSelect={handleDoctorSelect} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindDoctorSearchIC;
