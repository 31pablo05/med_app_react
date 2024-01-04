import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities, setSpecialities] = useState(initSpeciality); // Ahora se utiliza
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/search/doctors?speciality=${speciality}`);
  };

  const handleSearch = (searchText) => {
    // Filtrar las especialidades basadas en la búsqueda del usuario
    const filteredSpecialities = initSpeciality.filter((speciality) =>
      speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setSpecialities(filteredSpecialities);
    setDoctorResultHidden(false); // Mostrar resultados
  };

  return (
    <div className='finddoctor'>
      <div className="home-search-container">
        <h1>Find a doctor and Consult instantly</h1>
        <div className="doctor-search-box">
          <input
            type="text"
            className="search-doctor-input-box"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setDoctorResultHidden(false)}
            onBlur={() => setDoctorResultHidden(true)}
            value={searchDoctor}
            onChange={(e) => {
              setSearchDoctor(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <div className="findiconimg">
            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
          </div>
          <div className="search-doctor-input-results" hidden={doctorResultHidden}>
            {specialities.map((speciality) => (
              <div
                className="search-doctor-result-item"
                key={speciality}
                onMouseDown={() => handleDoctorSelect(speciality)}
              >
                <span>
                  <img
                    src={process.env.PUBLIC_URL + '/images/search.svg'}
                    alt=""
                    style={{ height: "10px", width: "10px" }}
                    width="12"
                  />
                </span>
                <span>{speciality}</span>
                <span>SPECIALITY</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorSearch;
