
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router'
// import { vendorUpdateRequest } from '../Action_file/VendorAction';

// function VendorUpdate() {

//     const  naviagte = useNavigate();
//     const dispatch = useDispatch();
//     const [formData , setFormData] = useState({
//     vendorName: '',
//     vendorCode:'',
//     status: '',
//     vendorType:  '',
//     address: '',
//     country: '',
//     dispAddress:'',
              
//     });

//   const handleChange = (e) =>{
//     e.prevendefault();
//     const{name, value} = e.target.value;
//     setFormData({...formData ,[name]:value})
//   };
//   const handlesubmit = (e) =>{
//    e.prevendefault();
//    dispatch(vendorUpdateRequest(formData))
//   }

//   return (
//     <div>
//     <form onSubmit={handlesubmit}>
//       <input name="name" onChange={handleChange} value={formData.name} placeholder="Name" />
//       <input name="vendocode" onChange={handleChange} value={formData.vendocode} placeholder="Vendor Code" />
//       <input name="address" onChange={handleChange} value={formData.address} placeholder="Address" />
//       <input name="type" onChange={handleChange} value={formData.type} placeholder="Type" />
//       <input name="country" onChange={handleChange} value={formData.country} placeholder="Country" />
//       <input name="status" onChange={handleChange} value={formData.status} placeholder="Status" />
//       <button type="submit">Update Vendor</button>
//     </form>
//     </div>
//   )
// }

// export default VendorUpdate;
