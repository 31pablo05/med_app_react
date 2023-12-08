
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import LandingPage from './Components/LandingPage/LandingPage';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
              <Routes>
              <Route path="/instantConsultation" element={<InstantConsultation />} />
              <Route path="/Login" element={<Login/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              <Route path="/Navbar" element={<Navbar/>}/>
              <Route path="/LandingPage" element={<LandingPage/>}/>
              </Routes>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;