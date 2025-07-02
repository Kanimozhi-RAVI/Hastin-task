import axios from "axios";
import { defaultPagination } from "../utils/Constant";
import { BASE_URL, getAuthHeaders } from "../utils/Service";
import apiEndpoints from "../API/Endpoint";
import { showError, showSuccess } from "../utils/ToastUtils";
import { GET_BOOKING_LIST_REQUEST, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST } from "../Types_File/HclType";
import { call, put, takeLatest } from 'redux-saga/effects';
import { getBookinglistFailure, getBookinglistSuccess, getInvoiceBillFailure, getInvoiceBillRequest, getInvoiceBillSuccess, getInvoicePartydetailsFailure, getInvoicePartydetailsSuccess }
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
// function* currencySaga(){
//   try{
//     const config = getAuthHeaders();
//     const response = yield call(axios.get,apiEndpoints.GET_CURRENCIES,config);
//     const data =response.data;
//     yield put(fetchCurrenciesSuccess(data))  
//   }catch (error) {
//     console.log(error , "Currency failed");
//   }
// }



   export default function* hclSaga(){
    yield takeLatest(GET_BOOKING_LIST_REQUEST, hclBookingSaga);
    yield takeLatest(GET_INVOICEBILL_REQUEST, invoiceBillSaga);
    yield takeLatest(GET_INVOICE_BILL_ID_REQUEST,invoiceSaga);
    // yield takeLatest(FETCH_CURRENCIES_REQUEST, currencySaga);
   }
   