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
          <Route path="latest-updates" element={<Latestupdates/>} />
          <Route path="home" element={<PrivateRoute><Home/></PrivateRoute>} />
          
        </Route>
      </Routes>
      </AuthSyncWrapper>
    </Router>
    </Provider>
  );
}

export default App;
