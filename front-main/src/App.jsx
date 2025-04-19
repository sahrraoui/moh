import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import EmailVer from './email-ver';
import VerCode from './ver-code';
import Signup from './signup';
import Navbar from './navbar';
import HelloWorld from './helloworld';
import ChangePassword from './changepass';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-ver" element={<EmailVer />} />
        <Route path="/ver-code" element={<VerCode />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/changepass" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;