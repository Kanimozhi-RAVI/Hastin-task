import axios from "axios";
import {
  vendorUpdateFailure,
  vendorUpdateSuccess,
  fetchCountriesSuccess,
  fetchCurrenciesSuccess,
  fetchCitiesSuccess,
  fetchVendorByIdSuccess,
  fetchVendorByIdFailure,
  updateVendorByIdSuccess,
  updateVendorByIdFailure,  
  deleteContactFailure,
  putcontactSuccess,
  putcontactFailure,
  createContactSuccess,
  createContactFailure,
  fetchInactiveVendorsSuccess,
  markInactiveSuccess,
  markInactiveFilure,
  markActiveSuccess,
  markActiveFilure,
  createVendorSuccess,
  createVendorFailure,
} from '../Action_file/VendorAction';
import {
  VENDOR_UPDATE_REQUEST,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CITIES_REQUEST,
  FETCH_COUNTRIES_REQUEST,
  FETCH_VENDOR_BY_ID_REQUEST,
  UPDATE_VENDOR_BY_ID_REQUEST,
  DELETE_CONTACT_REQUEST,
  CREATE_VENDOR_REQUEST,
  PUT_CONTACT_REQUEST,
  CREATE_CONTACT_REQUEST,
  FETCH_INACTIVE_VENDORS_REQUEST,
  FETCH_INACTIVE_VENDORS_FAILURE,
  MARK_INACTIVE_REQUEST,
  MARK_ACTIVE_REQUEST,
} from "../Type";

import { takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";



function* handleVendor() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token missing");

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const body = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null,
      },
    };

    const response = yield call(
      axios.put,
      "https://hastin-container.com/staging/api/vendor/search/active",
      body,
      config
    );

    const vendorlist = response.data?.data?.tableData || [];
    yield put(vendorUpdateSuccess(vendorlist));
  
    console.log(response.data)
      toast.success("Vendor Table fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } catch (error) {
    console.error("Vendor Fetch Error:", error);
    yield put(
      vendorUpdateFailure(
        error?.response?.data?.message || "Vendor fetch failed"
        
      )
    );
    toast.error(" Vendor table  failed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}

function* fetchCountries() {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = yield call(
      axios.get,
      "https://hastin-container.com/staging/api/meta/country",
      config
    );

    yield put(fetchCountriesSuccess(response.data?.data || []));
    
  } catch (error) {
    console.error("Country Fetch Error:", error.message);

  }
}

function* fetchCurrencies() {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = yield call(
      axios.get,
      "https://hastin-container.com/staging/api/meta/currencies",
      config
    );

    yield put(fetchCurrenciesSuccess(response.data?.data || []));
  } catch (error) {
    console.error(" Currency Fetch Error:", error.message);
  }
}

function* fetchCities() {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = yield call(
      axios.get,
      "https://hastin-container.com/staging/api/countryCities/get",
      config
    );

    yield put(fetchCitiesSuccess(response.data?.data || []));
  } catch (error) {
    console.error(" City Fetch Error:", error.message);
  }
}
function* fetchVendorByIdSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(
      axios.get,
      `https://hastin-container.com/staging/api/vendor/get/${action.payload}`,
      config
    );

    if (response.data && response.data.data) {
      yield put(fetchVendorByIdSuccess(response.data.data));
         toast.success(" Vendor fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    yield put(fetchVendorByIdFailure(
      error?.response?.data?.message || 
      error.message || 
      'Failed to fetch vendor details'
    ));
      toast.error(" Vendor fetched Fialed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}

function* updateVendorSaga(action) {
  try {
    const payload = action.payload; 
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = yield call(
      axios.put,
      `https://hastin-container.com/staging/api/vendor/update`,
      payload,
      config
    );

    console.log("Update API response:", response.data.data);
    yield put(updateVendorByIdSuccess(response.data?.data));
    toast.success(" Vendor updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } catch (error) {
    // console.error("Update saga error:", error);
    yield put(updateVendorByIdFailure(
      error?.response?.data?.message || error.message || 'Update failed'
    ));
     toast.error(" Vendor updated Failed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}


function* createVendorSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const payload = action.payload || {};
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(
      axios.post,
      'https://hastin-container.com/staging/api/vendor/create',
      payload,
      config
    );

    const vendorId = response?.data?.data?.id || response?.data?.data;

    yield put(createVendorSuccess(vendorId));

    toast.success('Vendor created successfully!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      'Something went wrong';

    yield put(createVendorFailure(error));

    toast.error(`Vendor creation failed: ${error}`, {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });

    if (action?.callback?.onError) {
      action.callback.onError(error);
    }
  }
}


function* deleteContactSaga(action) {
  console.log("Saga received payload:", action.payload); 
 const { contactId, createdBy, onSuccess } = action.payload || {};
  console.log("contactId:", contactId); 
  console.log("createdBy:", createdBy);

  try {
    const token = localStorage.getItem("authToken");

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const url = `https://hastin-container.com/staging/api/vendor/contact/delete/${contactId}/${createdBy}`;
    console.log("DELETE URL:", url);

    yield call(axios.delete, url, config);

    yield put(fetchVendorByIdSuccess(contactId)); 
     toast.success("Contact deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

    if (onSuccess) {
      onSuccess(); 
    }
    

  } catch (error) {
    console.error('Delete contact failed', error);
    yield put(deleteContactFailure(error?.response?.data?.message || 'contact delete failed'))
     toast.success("Contact deleted Failed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}



// contact url = 'https://hastin-container.com/staging/api/vendor/contact/update'
function* putcontactlist(action) {
  try {
    const token = localStorage.getItem("authToken");

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      name: action.payload.name,
      email: action.payload.email,
      id: action.payload.id,
      mobileNo: action.payload.mobileNo, // ✅ keep as-is if already a string
      isDefault: action.payload.isDefault,
      vendorId: action.payload.vendorId,
      createdBy: action.payload.createdBy,
    };

    const response = yield call(
      axios.put,
      "https://hastin-container.com/staging/api/vendor/contact/update",
      payload,
      config
    );

   yield put(putcontactSuccess(response?.data?.data || {}));
   console.log('put contact response data:', response?.data?.data);

    toast.success("Contact updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

  } catch (error) {
    console.error("Contact update error:", error);
    yield put(
      putcontactFailure(error?.response?.data?.message || "Contact Update Error")
    );


    toast.error("Contact update failed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}




function* createContactSaga(action) {
  try {
    const token = localStorage.getItem("authToken");

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      name: action.payload.name,
      email: action.payload.email,
      mobileNo: Number(action.payload.mobileNo),
      isDefault: action.payload.isDefault === "YES" ? true : false,
      vendorId: action.payload.vendorId,
      createdBy: action.payload.createdBy,
    };

    const response = yield call(
      axios.post,
      "https://hastin-container.com/staging/api/vendor/contact/create",
      payload,
      config
    );

    const newContact = {
      ...payload,
      id: response.data.data, 
    };

    yield put(createContactSuccess(newContact));
       toast.success(" Contact Created successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } catch (error) {
    console.error("Contact creation error:", error?.response?.data || error.message);
    yield put(
      createContactFailure(
        error?.response?.data?.message || "Contact Create Error"
      )
    );
     toast.error(" Contact  created failed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}


function* getInactiveVendorsSaga() {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`, 
        'Content-Type': 'application/json',
      },
    };

    const payload = {
      pagination: {
        index: 1,
        rowCount: -1,
        searchObj: null,
        sortingObj: null,
      },
    };

    const response = yield call(() =>
      axios.put("https://hastin-container.com/staging/api/vendor/search/inactive", payload, config)
    );

    const tableData = response.data?.data?.tableData || [];

    yield put(fetchInactiveVendorsSuccess(tableData));
     toast.success(" Inactive Vendor fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } catch (error) {
    console.error("Inactive Vendor Fetch Failed:", error?.response || error);
    yield put({
      type: FETCH_INACTIVE_VENDORS_FAILURE,
      payload: error?.response?.data?.message || "Failed to fetch inactive vendors",
    });
     toast.error("Inactive vendor fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
}

export function* markInactiveSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const vendorId = action.payload;

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`, // or Bearer
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(
      axios.put,
      `https://hastin-container.com/staging/api/vendor/inactive/${vendorId}`,
      {},
      config
    );

    const tableData = response?.data?.data || [];
    yield put(markInactiveSuccess(tableData));
    console.log('Marked Inactive:', tableData);
  } catch (error) {
    yield put(
      markInactiveFilure(error.response?.data?.message || 'Mark inactive failed')
    );
  }
}

export function* markActiveSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const vendorId = action.payload;

    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`, // or Bearer
        'Content-Type': 'application/json',
      },
    };

    const response = yield call(
      axios.put,
      `https://hastin-container.com/staging/api/vendor/active/${vendorId}`,
      {},
      config
    );

    const tableData = response?.data?.data || [];
    yield put(markActiveSuccess(tableData));
    console.log('Marked Active:', tableData);
  } catch (error) {
    yield put(
      markActiveFilure(error.response?.data?.message || 'Mark active failed')
    );
  }
}



export default function* vendorSaga() {
  yield takeLatest(VENDOR_UPDATE_REQUEST, handleVendor);
  yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountries);
  yield takeLatest(FETCH_CURRENCIES_REQUEST, fetchCurrencies);
  yield takeLatest(FETCH_CITIES_REQUEST, fetchCities);
  yield takeLatest(UPDATE_VENDOR_BY_ID_REQUEST, updateVendorSaga);
  yield takeLatest(FETCH_VENDOR_BY_ID_REQUEST, fetchVendorByIdSaga);
  yield takeLatest(CREATE_VENDOR_REQUEST, createVendorSaga);
  yield takeLatest(DELETE_CONTACT_REQUEST, deleteContactSaga);
  yield takeLatest(PUT_CONTACT_REQUEST,putcontactlist);
  yield takeLatest(CREATE_CONTACT_REQUEST,createContactSaga);
  yield takeLatest(FETCH_INACTIVE_VENDORS_REQUEST,getInactiveVendorsSaga);
  yield takeLatest(MARK_INACTIVE_REQUEST,markInactiveSaga)
  yield takeLatest(MARK_ACTIVE_REQUEST,markActiveSaga)


}