import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './output.css'
import Layout from './Components/Layout/Layout';
import Dashboard from './Components/Dashboard/Dashboard';
import ContactUs from './Components/Contact/ContactUs';
//import LatestUpdates from './pages/LatestUpdates';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="contact" element={<ContactUs/>} />
          
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
