
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert'
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState('')
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
  }
  return (<NoteState>
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
          <Route exact path='/signUp' element={<SignUp showAlert={showAlert} />}></Route>
        </Routes>
      </div>
    </Router>
  </NoteState>)
}

export default App;
