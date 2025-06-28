import { GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS, GET_INVOICEBILL_REQUEST } from "../Type";


export const getBookinglistRequest = () => ({
    type:GET_BOOKING_LIST_REQUEST,
    
});
export const getBookinglistSuccess = (data) => ({
    type:GET_BOOKING_LIST_SUCCESS,
    payload:data,
});
export const getBookinglistFailure = (error) => ({
    type:GET_BOOKING_LIST_FAILURE,
    payload:error,
});

export const getInvoiceBillRequest = () =>({
    type:GET_INVOICEBILL_REQUEST,
});
export const getInvoiceBillSuccess = (data) =>({
    type:GET_INVOICEBILL_REQUEST,
    paylooad:data,
});
export const getInvoiceBillFailure = (error) =>({
    type:GET_INVOICEBILL_REQUEST,
    payload:error,
});