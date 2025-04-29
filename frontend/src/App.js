import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/LoginRegister/Register';
import Login from './components/LoginRegister/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Home from './components/HomePage/Home';
import Welcome from './components/welcome/WelcomePage';
import AdminLogin from './components/AdminLogin/AdminLogin';
import DashBoard from './components/DashBoard/DashBoard';
import FetchUsers from './components/FetchUsers/FetchUsers';
import FetchMaterials from './components/FetchMaterials/FetchMaterials';
import FetchMaterialForm from './components/FetchMaterialForm/FetchMaterialForm';
import MaterialSuggestionBanner from './components/MaterialSuggestionBanner/MaterialSuggestionBanner';
import SlidingImageCarousel from './components/SlidingImageCarousel/SlidingImageCarousel';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/fetchusers" element={<FetchUsers />} />
                <Route path="/fetchmaterials" element={<FetchMaterials />} />
                <Route path="/fetchmaterialform" element={<FetchMaterialForm />} />
                <Route path="/materialsuggestionbanner" element={<MaterialSuggestionBanner />} />
                <Route path="/slidingimagecarousel" element={<SlidingImageCarousel />} />
            </Routes>
        </Router>
    );
}

export default App;
