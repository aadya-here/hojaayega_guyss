import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { VendorProvider } from './context/vendorContext';
import VendorLoginPage from './pages/SigninV';
import { Test } from './pages/Test';
import BrickMasonryQCForm from './pages/forms/job_specific/BrickMasonry';
import MicroConcreteForm from './pages/forms/job_specific/MicroConcrete';
import MortarPlasteringQCForm from './pages/forms/job_specific/Mortar';
import PaintingQCForm from './pages/forms/job_specific/Painting';
import PlasteringQCForm from './pages/forms/job_specific/Plastering';
import Forms from './pages/Forms';
import BottomNavbar from './components/BottomNavbar';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <VendorProvider initialVendorId={null}>
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/vendor-login" element={<VendorLoginPage />} />
              <Route path="/test" element={<Test />} />


              <Route path="/forms" element={<Forms />} />
              {/* <Route path="job-specific" element={<Forms />}>
                <Route path="brick-masonry" element={<BrickMasonryQCForm />} />
                <Route path="micro-concrete" element={<MicroConcreteForm />} />
                <Route path="mortar" element={<MortarPlasteringQCForm />} />
                <Route path="painting" element={<PaintingQCForm />} />
                <Route path="plastering" element={<PlasteringQCForm />} />
              </Route>
            </Route> */}

            </Routes>
          </VendorProvider>
        </div>
        <BottomNavbar />
      </Router>
    </>
  );
};

export default App;
