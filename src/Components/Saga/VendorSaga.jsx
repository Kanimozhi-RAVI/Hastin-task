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
  updateVendorByIdFailure,  deleteContactSuccess,
  deleteContactFailure,
  putcontactSuccess,
  putcontactFailure,
    createContactSuccess,
  createContactFailure,
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


} from "../Type";

import { takeLatest, put, call } from "redux-saga/effects";



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
  } catch (error) {
    console.error("Vendor Fetch Error:", error);
    yield put(
      vendorUpdateFailure(
        error?.response?.data?.message || "Vendor fetch failed"
      )
    );
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
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    yield put(fetchVendorByIdFailure(
      error?.response?.data?.message || 
      error.message || 
      'Failed to fetch vendor details'
    ));
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
  } catch (error) {
    // console.error("Update saga error:", error);
    yield put(updateVendorByIdFailure(
      error?.response?.data?.message || error.message || 'Update failed'
    ));
  }
}




function* createVendorSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `BslogiKey ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = yield call(
      axios.post,
      "https://hastin-container.com/staging/api/vendor/create",
      action.payload,
      config
    );

    yield put({ type: 'CREATE_VENDOR_SUCCESS', payload: response.data.data });
  } catch (error) {
    yield put({ type: 'CREATE_VENDOR_FAILURE', payload: error.message });
  }
}



function* deleteContactSaga(action) {
  const { vendorId, contactId } = action.payload;

  try {
    const token = localStorage.getItem('token');
    const response = yield call(axios.delete, 
      `https://hastin-container.com/staging/api/vendor/contact/delete/${contactId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(deleteContactSuccess(contactId));
  } catch (error) {
    yield put(deleteContactFailure(error.response?.data?.message || error.message));
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

  const payload = action.payload;

    const response = yield call(
      axios.put,
      "https://hastin-container.com/staging/api/vendor/contact/update",
      payload,
      config
    );

    console.log("Update contact response:", response?.data?.data?.contactList);
    yield put(putcontactSuccess(response?.data?.data?.contactList || []));
  } catch (error) {
    console.error("Contact update error:", error);
    yield put(
      putcontactFailure(error?.response?.data?.message || "Contact Update Error")
    );
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

    console.log("Payload for contact create:", JSON.stringify(payload, null, 2));

    const response = yield call(
      axios.post,
      "https://hastin-container.com/staging/api/vendor/contact/create",
      payload,
      config
    );

    yield put(createContactSuccess(response.data.data));
  } catch (error) {
    console.error("Contact creation error:", error?.response?.data || error.message);
    yield put(
      createContactFailure(
        error?.response?.data?.message || "Contact Create Error"
      )
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
  yield takeLatest(PUT_CONTACT_REQUEST,putcontactlist)
  yield takeLatest(CREATE_CONTACT_REQUEST,createContactSaga)




}