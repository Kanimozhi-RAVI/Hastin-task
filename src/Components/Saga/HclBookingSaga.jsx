import axios from "axios";
import { defaultPagination } from "../utils/Constant";
import { getAuthHeaders } from "../utils/Service";
import apiEndpoints from "../API/Endpoint";
import { showError, showSuccess } from "../utils/ToastUtils";
import { GET_BOOKING_LIST_REQUEST } from "../Type";
import { call, put, takeLatest } from 'redux-saga/effects';
import { getBookinglistFailure, getBookinglistSuccess } from "../Action_file/HclBookingAction";


const API = 'https://hastin-container.com/staging/api/soc/booking//search-all/active/bookings';
function* hclBookingSaga() {
  try {
    const config = getAuthHeaders(); 
    const payload = {
    pagination: {
    index: 1,
    rowCount: -1,
    searchObj: null,
    sortingObj: null,
  }
}

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



   

   export default function* hclSaga(){
    yield takeLatest(GET_BOOKING_LIST_REQUEST, hclBookingSaga)
   }
   