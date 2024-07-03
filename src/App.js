import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { VendorProvider } from './context/vendorContext';
import VendorLoginPage from './pages/SigninV';

const App = () => {
  return (
    <Router>
      <div>
        <VendorProvider initialVendorId={null}>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='/vendor-login' element={<VendorLoginPage />} />
          </Routes>
        </VendorProvider>
      </div>
    </Router>
  );
};

export default App;
