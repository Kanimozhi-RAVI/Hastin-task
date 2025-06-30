import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // ✅ use react-router-dom
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
import BookingTable from './Components/Hcl_Page/BookingTable';
import InvoiceBill from './Components/Invoice_Bill_Page/InvoiceBill';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* Public login routes */}
          <Route path='/' element={<Login />} />
          <Route path='/access' element={<AccessCodeModal />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/invo/:id' element={<InvoiceBill/>}/>
          <Route path="/invoice/:id/:invoiceId" element={<InvoiceBill />} />


          {/* Protected Main Layout Route */}
          <Route path='/nextpage' element={<MainFile />}>
            <Route index element={<VendorTable />} /> {/* default route under MainFile */}
            <Route path='tab' element={<VendorTable />} />
            <Route path='vendoredit/:id' element={<VendorEdit />} />
            <Route path='vendorcreate' element={<VendorEdit />} />
            <Route path='vendor/update/:id' element={<VendorEdit />} />
            <Route path='vendorcontact' element={<VendorContacts />} />
            <Route path='exam' element={<ExamFile />} />
            <Route path='contact' element={<VendorContactsCreate />} />
            <Route path='hcl-booking' element={<BookingTable />} />
            
          </Route>
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
