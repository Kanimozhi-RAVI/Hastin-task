// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './Components/Login_page/Login';
import AccessCodeModal from './Components/Login_page/AccessCode';
import Appfile from './Components/Appfile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/access' element ={<AccessCodeModal/>}/>
      <Route path= '/nextpage' element={<Appfile/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
