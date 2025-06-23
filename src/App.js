import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './Components/Login_page/Login';
import AccessCodeModal from './Components/Login_page/AccessCode';
import MainFile from './Components/Navbar_File/MainFile';
import Loader from './Components/Loader_File/Loader';
import VendorTable from './Components/VendorPage/VendorTable';
import VendorEdit from './Components/VendorPage/VendorEdit';
import VendorContacts from './Components/VendorPage/VendorContacts';
import ExamFile from './Components/ExamFile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorContactsCreate from './Components/VendorPage/VendorContactsCreate';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/access' element={<AccessCodeModal />} />
          <Route path='/nextpage' element={<MainFile />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/tab' element={<VendorTable />} />
          <Route path='/vendoredit/:id' element={<VendorEdit />} />
          <Route path='/vendorcreate' element={<VendorEdit />} />
          <Route path='/vendor/update/:id' element={<VendorEdit />} />
          <Route path='/vendorcontact' element={<VendorContacts />} />
          <Route path='/exam' element={<ExamFile />} />
          <Route path='/contact' element={<VendorContactsCreate />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </BrowserRouter>
  );
}


export default App;
