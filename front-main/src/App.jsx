import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import EmailVer from './email-ver';
import VerCode from './ver-code';
import Signup from './signup';
import ChangePassword from './changepass';
import Card from './card';
import Hotel from './Hotel';
import Car from './Car';
import Rental from './Rental';
import Home from './home';
import AuthSuccess from './AuthSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/rentals" element={<Rental />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-ver" element={<EmailVer />} />
        <Route path="/ver-code" element={<VerCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;