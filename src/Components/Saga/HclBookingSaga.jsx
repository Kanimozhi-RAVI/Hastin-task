import axios from "axios";
import { defaultPagination } from "../utils/Constant";
import { BASE_URL, getAuthHeaders } from "../utils/Service";
import apiEndpoints from "../API/Endpoint";
import { showError, showSuccess } from "../utils/ToastUtils";
import { BILL_TO_REQUEST, BOOKING_AGENT_REQUEST, FETCH_CHARGE_NAMES_REQUEST, FETCH_CHARGE_NAMES_SUCCESS, FETCH_CHARGE_TABLE_REQUEST, FETCH_TAX_MASTERS_REQUEST, FETCH_TAX_MASTERS_SUCCESS, GET_AGENT_REQUEST, GET_BOOKING_LIST_REQUEST, GET_CUSTOMER_DETAIL_REQUEST, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST, HEAD_REQUEST } from "../Types_File/HclType";
import { call, put, take, takeLatest } from 'redux-saga/effects';
import { billtoFailure, billtoSuccess, fetchChargeFailure, fetchChargeSucces, getAgentFailure, getAgentSuccess, getBookinglistFailure, getBookinglistSuccess, getCustomerDetailFailure, getCustomerDetailSuccess, getHeaderFailure, getHeaderSuccess, getInvoiceBillFailure, getInvoiceBillRequest, getInvoiceBillSuccess, getInvoicePartydetailsFailure, getInvoicePartydetailsSuccess }
 from "../Action_file/HclBookingAction";



// const API = 'https://hastin-container.com/staging/api/soc/booking//search-all/active/bookings';
function* hclBookingSaga() {
  try {
    const config = getAuthHeaders(); 
    const payload = defaultPagination();

    console.log("📤 Payload:", payload);
    console.log("🔐 Headers:", config);
    console.log("🌐 URL:", apiEndpoints.GET_BOOKINGS);

    const response = yield call(axios.put, apiEndpoints.GET_BOOKINGS, payload, config);
    const bookingList = response.data?.data?.tableData || [];
   console.log(bookingList)
    yield put(getBookinglistSuccess(bookingList));
    showSuccess("Booking fetched successfully!");
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    yield put(getBookinglistFailure(error?.response?.data?.message || "Booking fetch failed"));
    showError("Booking fetch failed!");
  }
}

function* invoiceBillSaga(action) {
  try {
    const { id } = action.payload;
    const config = getAuthHeaders();

    const url = `${apiEndpoints.GET_INVOICEBILL}/${id}`;
    const response = yield call(axios.get, url, config);

    const data = response.data?.data;
 
    // const invoice =data?.invoices || [];
    // const bill = data?.bills || [];
    // const total = {invoice,bill}
   console.log(data)

    yield put(getInvoiceBillSuccess(data));
  } catch (error) {
    yield put(getInvoiceBillFailure(error?.response?.data?.message || "Invoice fetch failed"));
  }
}
 
function* invoiceSaga(action) {
  try {
    const { id } = action.payload;
    const config = getAuthHeaders();

    const url = `${apiEndpoints.GET_PARTY_DETAILS}/${id}`
    const response = yield call(axios.get, url, config);

    const data = response?.data?.data;

    if (data) {
      yield put(getInvoicePartydetailsSuccess(data));
    } else {
      throw new Error('No data in response');
    }

  } catch (error) {
    yield put(getInvoicePartydetailsFailure(error?.response?.data?.message || "Invoice fetch failed"));
  }
}
 function* headerSaga() {
  try {
    const config = getAuthHeaders(); 
    const URL = 'https://hastin-container.com/staging/api/account-head/get/all';

    const response = yield call(axios.get, URL, config);
    const data = response.data?.data;
    yield put(getHeaderSuccess(data || []));
  } catch (error) {
    console.error('Header Fetch Error: ', error);
    yield put(getHeaderFailure(error?.response?.data?.message || 'Header fetch failed'));
  }
}

function* agentSaga(){
  try{
    const config = getAuthHeaders();
    const url = 'https://hastin-container.com/staging/api/agent/get';
     const response = yield call(axios.get, url, config);
     const data =  response.data || [];
     yield put(getAgentSuccess(data));
     console.log(data);
  yield put(getAgentSuccess(data))

  }catch (error) {
    console.error('Header Fetch Error: ', error);
    yield put(getAgentFailure(error?.response?.data?.message || 'Header fetch failed'));
  }
}

function* bookingAgentSaga(){
  try{
    const  config = getAuthHeaders();
    const url = 'https://hastin-container.com/staging/api/agent/fetch/booking-agent'
    const response = yield call(axios.get,url,config);
    const data = response.data || [];
    yield put(getBookinglistSuccess(data))
    console.log("BookingAGENT DATA",data)
    
  }catch(error){
     console.error('Header Fetch Error: ', error);
    yield put(getBookinglistFailure(error?.response?.data?.message || 'Header fetch failed'));
  }
}
// function* fetchChargeSaga(action){
//   try{
//     const {id} = action.payload;
//     const config = getAuthHeaders();
//     const url = `https://hastin-container.com/staging/api/accouting/soc/invoice/item/get/${id}`;
//     const response = yield call(axios.get,url,config);
//     const data = response || [];
//     yield put(fetchChargeSucces(data));
//     console.log(data)
//   }catch(error){
//      console.error('Header Fetch Error: ', error);
//     yield put(fetchChargeFailure(error?.response?.data?.message || 'Header fetch failed'));
//   }
// }

function* fetchChargeSaga(action) {
  try {
    const { id } = action.payload;
    const config = getAuthHeaders();
    const response = yield call(() =>
      axios.get(`https://hastin-container.com/staging/api/accouting/soc/invoice/item/get/${id}`,config)
    );

    const component = response.data?.data?.invoicesComponents?.[0] || null;
    yield put(fetchChargeSucces(component));
  } catch (error) {
    yield put(fetchChargeFailure(error));
  }
}
function* fetchChargeNamesSaga() {
    const config = getAuthHeaders();

  const res = yield call(() =>
    axios.get('https://hastin-container.com/staging/api/charge/get-all-by-port-booking-type/a28de388-ddfe-4770-bf13-1e4ff051c25a/SOC', config));
  yield put({ type: FETCH_CHARGE_NAMES_SUCCESS, payload: res.data.data });
}

function* fetchTaxMastersSaga() {
    const config = getAuthHeaders();

  const res = yield call(() =>
    axios.get('https://hastin-container.com/staging/api/tax/search/a28de388-ddfe-4770-bf13-1e4ff051c25a', config)

  
  );
  yield put({ type: FETCH_TAX_MASTERS_SUCCESS, payload: res.data.data });
}

function* fetchBillToSuggestions(action) {
  try {
    console.log("📡 Saga Triggered - billtoRequest:", action.payload); // ✅
    const config = getAuthHeaders();
    const searchTerm = action.payload;
    const url = `https://hastin-container.com/staging/api/customer/auto/complete/${searchTerm}`;
    const response = yield call(axios.get, url, config);
    console.log(response)
    yield put(billtoSuccess(response.data?.data || []));
  } catch (error) {
    console.error("❌ billtoRequest error", error);
    yield put(billtoFailure(error));
  }
}


function* fetchCustomerDetail(action) {
  try {
    const config = getAuthHeaders();
    const customerId = action.payload;
    const url = `https://hastin-container.com/staging/api/customer/get/${action.payload}`;
    const response = yield call(axios.get, url, config);
    const data = response.date?.data || [];
    console.log(data)
    yield put(getCustomerDetailSuccess(data));
    console.log(response)
  } catch (error) {
    yield put(getCustomerDetailFailure(error));
  }
}

   export default function* hclSaga(){
    yield takeLatest(GET_BOOKING_LIST_REQUEST, hclBookingSaga);
    yield takeLatest(GET_INVOICEBILL_REQUEST, invoiceBillSaga);
    yield takeLatest(GET_INVOICE_BILL_ID_REQUEST,invoiceSaga);
    yield takeLatest(HEAD_REQUEST, headerSaga);
    yield takeLatest(GET_AGENT_REQUEST, agentSaga);
    yield takeLatest(BOOKING_AGENT_REQUEST,bookingAgentSaga);
    yield takeLatest(FETCH_CHARGE_TABLE_REQUEST,fetchChargeSaga);
    yield takeLatest(FETCH_CHARGE_NAMES_REQUEST,fetchChargeNamesSaga);
    yield takeLatest(FETCH_TAX_MASTERS_REQUEST,fetchTaxMastersSaga);
    yield takeLatest(BILL_TO_REQUEST,fetchBillToSuggestions);
    yield takeLatest(GET_CUSTOMER_DETAIL_REQUEST,fetchCustomerDetail)
   }
   