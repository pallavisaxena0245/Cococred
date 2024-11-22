import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Landing from './components/Landing.js'
import AuthService from './contexts/AuthService.js';
import WalletService from './contexts/WalletService.js';
import Profile from './components/Profile.js';
import Attribute from './components/Attribute.js';
import CertificateService from './contexts/CertificateService.js';
import Certificate from './components/Certificate.js';
function App() {
  return (
   <CertificateService>
    <WalletService>
    <AuthService>    
    <Router>
    <Navbar title="Cococred" />
    <Routes>
      <Route path="/attribute_cert" element={<Attribute/>} />
      <Route path="/user_verify" element={<Profile/>} />
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<Login user_choice='user'/>} />
      <Route path="/home" element={<Landing />} />
      <Route path="/user_login" element={<Login user_choice='user'/>} />
      <Route path="/auth_login" element={<Login user_choice='admin'/>} />
      <Route path="/certificate" element={<Certificate/>}/>
    </Routes>
    </Router>
   </AuthService>
   </WalletService>
   </CertificateService>

  );
}

export default App;