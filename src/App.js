import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileForm from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
        useEffect(() => {
            // Simulación de una operación asincrónica, por ejemplo, una llamada a una API
            const fetchData = async () => {
                try {
                    const response = await fetch('https://api.example.com/data');
                    const data = await response.json();
                    console.log('Datos obtenidos:', data);
                    // Puedes realizar más acciones con los datos aquí
                } catch (error) {
                    console.error('Error al obtener datos:', error);
                }
            };
    
            fetchData();  // Llamada a la función para obtener datos cuando el componente se monta
    
            // Puedes realizar otras operaciones de limpieza o configuración aquí si es necesario
    
        }, []); 

    return (
        <div className="App">
            <BrowserRouter>
                <Notification>
                    <Navbar />
                    <Routes>
                        <Route path="/LandingPage" element={<LandingPage />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/instantConsultation" element={<InstantConsultation />} />
                        <Route path='/findDoctor' element={<FindDoctorSearch />} />
                        <Route path='/search/doctors' element={<BookingConsultation />} />
                        <Route path='/reviews' element={<ReviewForm />} />
                        <Route path='/profile' element={<ProfileForm />} />
                        <Route path='/reports' element={<ReportsLayout />} />                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}
export default App;