// InstantConsultation.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar una lista de médicos filtrados.
 * @param {Object[]} filteredDoctors - Lista de médicos filtrados.
 * @returns {JSX.Element} - Elemento de React para mostrar la lista de médicos.
 */
function InstantConsultation({ filteredDoctors }) {
  return (
    <div>
      <h2>Instant Consultation</h2>
      {filteredDoctors.length === 0 ? (
        <p>No hay médicos disponibles en este momento.</p>
      ) : (
        <ul>
          {filteredDoctors.map((doctor) => (
            <li key={doctor.id}>
              <div>
                <h3>{doctor.name || 'Nombre no disponible'}</h3>
                <p>Especialidad: {doctor.speciality || 'Especialidad no disponible'}</p>
                {/* Agrega más detalles del médico según sea necesario */}
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Agrega más contenido según sea necesario */}
    </div>
  );
}

InstantConsultation.propTypes = {
  filteredDoctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      speciality: PropTypes.string,
      // Agrega más propTypes según sea necesario
    })
  ).isRequired,
};

export default InstantConsultation;
