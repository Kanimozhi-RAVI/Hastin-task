import axios from "axios";
import {
  vendorUpdateFailure,
  vendorUpdateSuccess,
  fetchCountriesSuccess,
  fetchCurrenciesSuccess,
  fetchCitiesSuccess,
  fetchVendorByIdSuccess,
  fetchVendorByIdFailure
} from '../Action_file/VendorAction';


import {
  VENDOR_UPDATE_REQUEST,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CITIES_REQUEST,
  FETCH_COUNTRIES_REQUEST,
  FETCH_VENDOR_BY_ID_REQUEST,


} from "../Type";

import { takeLatest, put, call } from "redux-saga/effects";

// ✅ Vendor Table Fetch (PUT)
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
  } catch (error) {
    console.error("❌ Vendor Fetch Error:", error);
    yield put(
      vendorUpdateFailure(
        error?.response?.data?.message || "Vendor fetch failed"
      )
    );
  }
}

// ✅ Fetch Country List
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
    console.error("❌ Country Fetch Error:", error.message);
  }
}

// ✅ Fetch Currency List
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
    console.error("❌ Currency Fetch Error:", error.message);
  }
}

// ✅ Fetch City List
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
    console.error("❌ City Fetch Error:", error.message);
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
      `https://hastin-container.com/staging/api/vendor/${action.payload}`,
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



// ✅ Root Saga
export default function* vendorSaga() {
  yield takeLatest(VENDOR_UPDATE_REQUEST, handleVendor);
  yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountries);
  yield takeLatest(FETCH_CURRENCIES_REQUEST, fetchCurrencies);
  yield takeLatest(FETCH_CITIES_REQUEST, fetchCities);
  yield takeLatest(FETCH_VENDOR_BY_ID_REQUEST, fetchVendorByIdSaga);

}
