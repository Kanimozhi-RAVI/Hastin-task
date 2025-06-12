// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './Components/Login_page/Login';
import AccessCodeModal from './Components/Login_page/AccessCode';
import MainFile from './Components/Navbar_File/MainFile';
import Loader from './Components/Loader_File/Loader';
import VendorUpdate from './Components/VendorPage/VendorUpdate';
import VendorTable from './Components/VendorPage/VendorTable';
import VendorEdit from './Components/VendorPage/VendorEdit';
import VendorContacts from './Components/VendorPage/VendorContacts';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/access' element ={<AccessCodeModal/>}/>
      <Route path= '/nextpage' element={<MainFile/>}/>
     <Route path='/loader' element={<Loader/>}/>
     {/* <Route path='/vendor' element={<VendorUpdate/>}/> */}
     <Route path='/tab' element={<VendorTable/>}/>
    <Route path="/vendoredit/:id" element={<VendorEdit />} />
    <Route path="/vendorcreate" element={<VendorEdit />} />
    <Route path="/vendor/update/:id" element={<VendorEdit />} />
    <Route path='/vendorcontact'element={<VendorContacts/>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
