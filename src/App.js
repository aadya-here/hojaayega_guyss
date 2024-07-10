import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { VendorProvider } from "./context/vendorContext";

// Page imports
import Home from "./pages/Home";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import VendorLoginPage from "./pages/SigninV";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectViewById";
import Forms from "./pages/Forms";
import FormsList from "./pages/FormsList";
import FormViewById from "./pages/FormViewById";
import Logs from "./pages/LogsList";
import LogView from "./pages/LogViewById";

// Form imports
import CreateLog from "./pages/forms/daily_checklists/CreateLog";
import PPEChecklist from "./pages/forms/daily_checklists/PPEChecklist";
import ToolBoxTalk from "./pages/forms/daily_checklists/ToolBoxTalk";
import FirstAidForm from "./pages/forms/daily_checklists/FirstAid";
import FIMForm from "./pages/forms/daily_checklists/FIMReq";
import ProtectedRoutes from "./layout/ProtectedRoutes";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignInPage /> },
  { path: "/vendor-login", element: <VendorLoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
];

const protectedRoutes = [
  { path: "/profile", element: <Profile /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:projectId", element: <ProjectView /> },
  { path: "/forms", element: <Forms /> },
  { path: "/forms/view", element: <FormsList /> },
  {
    path: "/forms/view/:formName/:formId/:formLogId",
    element: <FormViewById />,
  },
  { path: "/logs", element: <Logs /> },
  { path: "/logs/:logId", element: <LogView /> },
  { path: "/create-log/:projectId", element: <CreateLog /> },
  {
    path: "/create-log/:projectId/ppe-checklist/:logId",
    element: <PPEChecklist />,
  },
  {
    path: "/create-log/:projectId/tool-box-talk/:logId",
    element: <ToolBoxTalk />,
  },
  {
    path: "/create-log/:projectId/first-aid/:logId",
    element: <FirstAidForm />,
  },
  { path: "/create-log/:projectId/fim-form/:logId", element: <FIMForm /> },
];

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <VendorProvider initialVendorId={null}>
          <Routes>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            <Route path="/" element={<ProtectedRoutes />}>
              {protectedRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </VendorProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
