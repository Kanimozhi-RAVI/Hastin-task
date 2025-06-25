import { GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS } from "../Type";


export const getBookinglistRequest = () =>({
    type:GET_BOOKING_LIST_REQUEST,
})
export const getBookinglistSuccess = (data) =>({
    type:GET_BOOKING_LIST_SUCCESS,
    payload:data,
})
export const getBookinglistFailure = (error) =>({
    type:GET_BOOKING_LIST_FAILURE,
    payload:error,
})