import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Users from './components/Users';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Manage from './components/Manage';
import Login from './components/Login';
import ManageArtist from './components/ManageArtist';
import ManageMusic from './components/ManageMusic';

function App() {
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routes>
      {/* <Route exact path="/" element={<Login/>} /> */}
      <Route path="/" element={<Login />} />

        {/* <Route exact path="/home" element={<Home/>} /> */}
        <Route exact path="/users" element={<Users/>} />
        <Route exact path="/manage" element={<Manage/>} />
        <Route exact path="/artistmanage" element={<ManageArtist/>} />
        <Route exact path="/musicmanage" element={<ManageMusic/>} />

      </Routes>
      </BrowserRouter>
    );
}

export default App;
