import axios from "axios";
import { defaultPagination } from "../utils/Constant";
import { BASE_URL, getAuthHeaders } from "../utils/Service";
import apiEndpoints from "../API/Endpoint";
import { showError, showSuccess } from "../utils/ToastUtils";
import { BOOKING_AGENT_REQUEST, GET_AGENT_REQUEST, GET_BOOKING_LIST_REQUEST, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST, HEAD_REQUEST } from "../Types_File/HclType";
import { call, put, take, takeLatest } from 'redux-saga/effects';
import { getAgentFailure, getAgentSuccess, getBookinglistFailure, getBookinglistSuccess, getHeaderFailure, getHeaderSuccess, getInvoiceBillFailure, getInvoiceBillRequest, getInvoiceBillSuccess, getInvoicePartydetailsFailure, getInvoicePartydetailsSuccess }
 from "../Action_file/HclBookingAction";
import { fetchCurrenciesSuccess } from "../Action_file/VendorAction";
import { FETCH_CURRENCIES_REQUEST } from "../Types_File/VendorType";


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


   export default function* hclSaga(){
    yield takeLatest(GET_BOOKING_LIST_REQUEST, hclBookingSaga);
    yield takeLatest(GET_INVOICEBILL_REQUEST, invoiceBillSaga);
    yield takeLatest(GET_INVOICE_BILL_ID_REQUEST,invoiceSaga);
    yield takeLatest(HEAD_REQUEST, headerSaga);
    yield takeLatest(GET_AGENT_REQUEST, agentSaga);
    yield takeLatest(BOOKING_AGENT_REQUEST,bookingAgentSaga)
   }
   