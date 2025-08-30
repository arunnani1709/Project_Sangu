import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import './output.css'
import { Provider, useDispatch } from 'react-redux';
import { syncAuthFromStorage } from './Components/Login/authSlice';
import PrivateRoute from './Components/PrivateRouter';
import { store } from './Redux/store';
import Layout from './Components/Layout/Layout';
import Dashboard from './Components/Dashboard/Dashboard';
import ContactUs from './Components/Contact/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Hospital from './Components/Hospital/Hospital';
import Latestupdates from './Components/LatestUpdates/Latestupdate';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import AdminBlogPanel from './Components/AdminBlogPanel/AdminBlogPanel'
import AddPatient from './Components/Patients/AddPatients/AddPatent';
import PatientList from './Components/Patients/PatientList/Patientlist';
import MedicalCertificate from './Components/MedicalCertificate/MedicalCertificate';
import CertificateList from './Components/MedicalCertificate/CertificateList';
import AddMedicine from './Components/Medicin/AddMedicine/AddMedicine';
import MedicineList from './Components/Medicin/MedicineList/MedicineList';
import ResetPassword from './Components/Reset password/ResetPassword';
import Swarnaprashana from './Components/Patients/Swarnaprashana/SwarnaPrasana';
import SwarnaprashanaPatientDetails from './Components/Patients/Swarnaprashana/SwarnaprashanaPatientDetails';

//import LatestUpdates from './pages/LatestUpdates';
const AuthSyncWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncAuthFromStorage());
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
    <Router>
      <AuthSyncWrapper>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login/>} />
          <Route path="contact" element={<ContactUs/>} />
          <Route path="about-us" element={<AboutUs/>} />
          <Route path="hospital" element={<Hospital/>} />
          <Route path="reset-password" element={<ResetPassword/>} />
          <Route path="latest-updates" element={<Latestupdates/>} />
          <Route path="home" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="admin-blog" element={<PrivateRoute><AdminBlogPanel/></PrivateRoute>} />
          <Route path="add-patient" element={<PrivateRoute><AddPatient/></PrivateRoute>} />
          <Route path="patient-list" element={<PrivateRoute><PatientList/></PrivateRoute>} />
          <Route path="medical-certificate" element={<PrivateRoute><MedicalCertificate/></PrivateRoute>} />
          <Route path="medical-certificate-list" element={<PrivateRoute><CertificateList/></PrivateRoute>} />
          <Route path="add-medicine" element={<PrivateRoute><AddMedicine/></PrivateRoute>} />
          <Route path="medicine-list" element={<PrivateRoute><MedicineList/></PrivateRoute>} />
          <Route path="swarna-parasana" element={<PrivateRoute><Swarnaprashana/></PrivateRoute>} />
          <Route path="/patient/:id" element={<PrivateRoute><SwarnaprashanaPatientDetails/></PrivateRoute>} />
          <Route path="/patient/:clinicId/:patientId" element={<PrivateRoute><SwarnaprashanaPatientDetails /></PrivateRoute>}/>
        </Route>
      </Routes>
      </AuthSyncWrapper>
    </Router>
    </Provider>
  );
}

export default App;
