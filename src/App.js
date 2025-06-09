// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './Components/Login_page/Login';
import AccessCodeModal from './Components/Login_page/AccessCode';
import MainFile from './Components/MainFile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/access' element ={<AccessCodeModal/>}/>
      <Route path= '/nextpage' element={<MainFile/>}/>
      {/* <Route path='/auth'element={<ap/>} */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
