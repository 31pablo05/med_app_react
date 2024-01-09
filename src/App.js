import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm'; // Fix the import statement
import ProfileForm from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Notification>
                    <Navbar />
                    <Routes>
                        <Route path="/LandingPage" element={<LandingPage />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/instant-consultation" element={<InstantConsultation />} />
                        <Route path="/finddoctor" element={<FindDoctorSearch />} />
                        <Route path="/search/doctors" element={<BookingConsultation />} />
                        <Route path="/reviews" element={<ReviewForm />} />
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path="/reports" element={<ReportsLayout />} />
                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}

export default App;
