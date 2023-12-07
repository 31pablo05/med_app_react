import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

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
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
              {specialities.map(speciality => (
                <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                  <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: "10px", width: "10px" }} width="12" /></span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default FindDoctorSearchIC;
