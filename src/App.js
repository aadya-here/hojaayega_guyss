import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { VendorProvider } from './context/vendorContext';
import VendorLoginPage from './pages/SigninV';
import { Test } from './pages/Test';
import Forms from './pages/Forms';
import BottomNavbar from './components/BottomNavbar';
import FormsList from './pages/FormsList';
import FormViewById from './pages/FormViewById';
import ProjectView from './pages/ProjectViewById';
import CreateLog from './pages/forms/daily_checklists/CreateLog';
import Profile from './pages/Profile'
import PPEChecklist from './pages/forms/daily_checklists/PPEChecklist';
import ToolBoxTalk from './pages/forms/daily_checklists/ToolBoxTalk';
import FirstAidForm from './pages/forms/daily_checklists/FirstAid';
import FIMForm from './pages/forms/daily_checklists/FIMReq';
import Logs from './pages/LogsList';
import LogView from './pages/LogViewById';





const App = () => {
  return (
    <>
      <Router>
        <div>
          <VendorProvider initialVendorId={null}>
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/vendor-login" element={<VendorLoginPage />} />
              <Route path="/test" element={<Test />} />

              <Route path="/forms" element={<Forms />} />
              <Route path="/forms-view" element={<FormsList />} />
              <Route
                path="/forms-view/:formName/:formId/:formLogId"
                element={<FormViewById />}
              />
              <Route path="/projects/:projectId" element={<ProjectView />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/logs/:logId" element={<LogView />} />




              <Route path="/create-log/:projectId" element={<CreateLog />} />
              <Route path="/create-log/:projectId/ppe-checklist/:logId" element={<PPEChecklist />} />
              <Route path="/create-log/:projectId/tool-box-talk/:logId" element={<ToolBoxTalk />} />
              <Route path="/create-log/:projectId/first-aid/:logId" element={<FirstAidForm />} />
              <Route path="/create-log/:projectId/fim-form/:logId" element={<FIMForm />} />








            </Routes>
          </VendorProvider>
        </div>
        <BottomNavbar />
      </Router>
    </>
  );
};

export default App;
