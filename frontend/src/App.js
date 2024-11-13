import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Landing from './components/Landing.js'
import AuthService from './contexts/AuthService.js';
function App() {
  return (

    <AuthService>    
    <Router>
    <Navbar title="Cococred" />
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<Login user_choice='user'/>} />
      <Route path="/home" element={<Landing />} />
      <Route path="/user_login" element={<Login user_choice='user'/>} />
      <Route path="/auth_login" element={<Login user_choice='admin'/>} />
    </Routes>
    </Router>
   </AuthService>

  );
}

export default App;