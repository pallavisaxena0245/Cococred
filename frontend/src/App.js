import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Landing from './components/Landing.js'
import AuthService from './contexts/AuthService.js';
import WalletService from './contexts/WalletService.js';
import Attribute from './components/Attribute.js';
function App() {
  return (

    <WalletService>
    <AuthService>    
    <Router>
    <Navbar title="Cococred" />
    <Routes>
      <Route path="/attribute_cert" element={<Attribute/>} />
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<Login user_choice='user'/>} />
      <Route path="/home" element={<Landing />} />
      <Route path="/user_login" element={<Login user_choice='user'/>} />
      <Route path="/auth_login" element={<Login user_choice='admin'/>} />
    </Routes>
    </Router>
   </AuthService>
   </WalletService>

  );
}

export default App;