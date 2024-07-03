import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path='/home' element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
