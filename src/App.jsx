import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './output.css'
import Layout from './Components/Layout/Layout';
import Dashboard from './Components/Dashboard/Dashboard';
import ContactUs from './Components/Contact/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Hospital from './Components/Hospital/Hospital';
//import LatestUpdates from './pages/LatestUpdates';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="contact" element={<ContactUs/>} />
          <Route path="about-us" element={<AboutUs/>} />
          <Route path="hospital" element={<Hospital/>} />
          
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
