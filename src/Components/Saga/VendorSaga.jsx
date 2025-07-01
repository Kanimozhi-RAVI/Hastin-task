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
  vendorUpdateRequest,
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
} from "../Types_File/VendorType";

import { takeLatest, put, call } from "redux-saga/effects";
import { getAuthHeaders } from "../utils/Service";
import { showSuccess, showError } from "../utils/ToastUtils";
import { defaultPagination } from "../utils/Constant";
import apiEndpoints from '../API/Endpoint';

function* handleVendor() {
  try {
    const config = getAuthHeaders();
    const body = defaultPagination();

    const response = yield call(axios.put,apiEndpoints.FETCH_ACTIVE_VENDORS,body,config);

    const vendorlist = response.data?.data?.tableData || [];
    yield put(vendorUpdateSuccess(vendorlist));
    showSuccess("Vendor fetched successfully!");
  } catch (error) {
    yield put(vendorUpdateFailure(error?.response?.data?.message || "Vendor fetch failed"));
    showError("Vendor table failed!");
  }
}

function* fetchCountries() {
  try {
    const config = getAuthHeaders();
    const response = yield call(axios.get, apiEndpoints.GET_COUNTRIES, config);
    yield put(fetchCountriesSuccess(response.data?.data || []));
  } catch (error) {
    console.error("Country Fetch Error:", error.message);
  }
}

function* fetchCurrencies() {
  try {
    const config = getAuthHeaders();
    const response = yield call(axios.get, apiEndpoints.GET_CURRENCIES, config);
    yield put(fetchCurrenciesSuccess(response.data?.data || []));
  } catch (error) {
    console.error("Currency Fetch Error:", error.message);
  }
}

function* fetchCities() {
  try {
    const config = getAuthHeaders();
    const response = yield call(axios.get, apiEndpoints.GET_CITIES, config);
    yield put(fetchCitiesSuccess(response.data?.data || []));
  } catch (error) {
    console.error("City Fetch Error:", error.message);
  }
}

function* fetchVendorByIdSaga(action) {
  try {
    const config = getAuthHeaders();
    const response = yield call( axios.get,apiEndpoints.GET_VENDOR_BY_ID(action.payload),config);

    if (response.data && response.data.data) {
      yield put(fetchVendorByIdSuccess(response.data.data));
      showSuccess("Vendor fetched successfully!");
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    yield put(fetchVendorByIdFailure(error?.response?.data?.message || 'Failed to fetch vendor details'));
    showError("Vendor fetch failed!");
  }
}

function* updateVendorSaga(action) {
  try {
    const config = getAuthHeaders();
    const response = yield call(axios.put,apiEndpoints.UPDATE_VENDOR,action.payload,config);
    yield put(updateVendorByIdSuccess(response.data?.data));
    showSuccess("Vendor updated successfully!");
  } catch (error) {
    yield put(updateVendorByIdFailure(error?.response?.data?.message || 'Update failed'));
    showError("Vendor update failed!");
  }
}

function* createVendorSaga(action) {
  try {
    const config = getAuthHeaders();
    const response = yield call(
      axios.post,
      apiEndpoints.CREATE_VENDOR,
      action.payload,
      config
    );

    const vendorId = response?.data?.data?.id || response?.data?.data;
    yield put(createVendorSuccess(vendorId));
    showSuccess("Vendor created successfully!");
    
    // ✅ call onSuccess callback if available
    if (action?.callback?.onSuccess) {
      action.callback.onSuccess(vendorId);
    }

  } catch (error) {
    // ✅ extract message safely
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong during vendor creation';

    yield put(createVendorFailure(message)); // ✅ Store only string
    showError(`Vendor creation failed: ${message}`);

    if (action?.callback?.onError) {
      action.callback.onError(message); // ✅ pass string, not object
    }
  }
}


function* deleteContactSaga(action) {
  const { contactId, createdBy, onSuccess } = action.payload;
  try {
    const config = getAuthHeaders();
    const url = apiEndpoints.DELETE_CONTACT(contactId, createdBy);
    yield call(axios.delete, url, config);
    if (onSuccess) onSuccess();
    showSuccess("Contact deleted successfully!");
  } catch (error) {
    yield put(deleteContactFailure(error?.response?.data?.message || 'Contact delete failed'));
    showError("Contact deletion failed!");
  }
}

function* putcontactlist(action) {
  try {
      const payload = {
      name: action.payload.name,
      email: action.payload.email,
      id: action.payload.id,
      mobileNo: action.payload.mobileNo, 
      isDefault: action.payload.isDefault,
      vendorId: action.payload.vendorId,
      createdBy: action.payload.createdBy,
    };
    const config = getAuthHeaders();
    const response = yield call(axios.put,apiEndpoints.UPDATE_CONTACT,payload,config);
    yield put(putcontactSuccess(response?.data?.data || {}));
    showSuccess("Contact updated successfully!");
  } catch (error) {
    yield put(putcontactFailure(error?.response?.data?.message || "Contact update failed"));
    showError("Contact update failed!");
  }
}

function* createContactSaga(action) {
  try {
    const config = getAuthHeaders();
    const payload = { ...action.payload, id: null, mobileNo: Number(action.payload.mobileNo) };
    const response = yield call(axios.post, apiEndpoints.CREATE_CONTACT, payload, config);

    const newContact = { ...payload, id: response.data.data };
    yield put(createContactSuccess(newContact));
    showSuccess("Contact created successfully!");
  } catch (error) {
    yield put(createContactFailure(error?.response?.data?.message || "Contact creation failed"));
    showError("Contact creation failed!");
  }
}

function* getInactiveVendorsSaga() {
  try {
    const config = getAuthHeaders();
    const response = yield call(
      axios.put,
      apiEndpoints.FETCH_INACTIVE_VENDORS,
      defaultPagination(),
      config
    );

    const tableData = response.data?.data?.tableData || [];
    yield put(fetchInactiveVendorsSuccess(tableData));
    showSuccess("Inactive vendors fetched successfully!");
  } catch (error) {
    yield put({
      type: FETCH_INACTIVE_VENDORS_FAILURE,
      payload: error?.response?.data?.message || "Failed to fetch inactive vendors",
    });
    showError("Inactive vendor fetch failed!");
  }
}

function* markInactiveSaga(action) {
  try {
    const config = getAuthHeaders();
    const response = yield call(
      axios.put,
      apiEndpoints.MARK_INACTIVE(action.payload),
      {},
      config
    );
    yield put(markInactiveSuccess(response?.data?.data || []));
    yield put(vendorUpdateRequest());
  } catch (error) {
    yield put(markInactiveFilure(error?.response?.data?.message || 'Mark inactive failed'));
    showError("Mark as inactive failed!");
  }
}

function* markActiveSaga(action) {
  try {
    const config = getAuthHeaders();
    const response = yield call( axios.put,apiEndpoints.MARK_ACTIVE(action.payload),{},  config);
    yield put(markActiveSuccess(response?.data?.data || []));
    yield put(vendorUpdateRequest());
  } catch (error) {
    yield put(markActiveFilure(error?.response?.data?.message || 'Mark active failed'));
    showError("Mark as active failed!");
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
  yield takeLatest(PUT_CONTACT_REQUEST, putcontactlist);
  yield takeLatest(CREATE_CONTACT_REQUEST, createContactSaga);
  yield takeLatest(FETCH_INACTIVE_VENDORS_REQUEST, getInactiveVendorsSaga);
  yield takeLatest(MARK_INACTIVE_REQUEST, markInactiveSaga);
  yield takeLatest(MARK_ACTIVE_REQUEST, markActiveSaga);
}
