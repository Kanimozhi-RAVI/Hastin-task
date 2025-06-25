import axios from "axios";
import { defaultPagination } from "../utils/Constant";
import { getAuthHeaders } from "../utils/Service";
import apiEndpoints from "../API/Endpoint";
import { showError, showSuccess } from "../utils/ToastUtils";
import { GET_BOOKING_LIST_REQUEST } from "../Type";



function* hclBookingSaga(){
try{
    const config = getAuthHeaders();
    const payload = defaultPagination();
    const response = yield call(axios.put,apiEndpoints.GET_BOOKINGS,payload,config);
   const bookingList = response.data?.data?.tableData || [];
       yield put(vendorUpdateSuccess(bookingList));
       showSuccess("booking fetched successfully!");
     } catch (error) {
       yield put(vendorUpdateFailure(error?.response?.data?.message || "Vendor fetch failed"));
       showError("booking table failed!");
     }
   }

   export default function* hclSaga(){
    yield put(GET_BOOKING_LIST_REQUEST, hclBookingSaga)
   }
   