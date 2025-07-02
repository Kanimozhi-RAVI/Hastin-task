import { CURRENCY_REQUEST, CURRENCY_SUCCESS, GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICE_BILL_ID_SUCCESS, 
    GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST, GET_INVOICEBILL_SUCCESS } from "../Types_File/HclType";


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

export const getInvoiceBillRequest = (id) =>({
    type:GET_INVOICEBILL_REQUEST,
    payload:{id},
});
export const getInvoiceBillSuccess = (data) =>({
    type:GET_INVOICEBILL_SUCCESS,
    payload:data,
});
export const getInvoiceBillFailure = (error) =>({
    type:GET_INVOICEBILL_FAILURE,
    payload:error,
});

export const  getInvoicePartydetailsRequest = (payload) =>({
    type:GET_INVOICE_BILL_ID_REQUEST,
    payload,
    
})
export const  getInvoicePartydetailsSuccess = (data) =>({
    type:GET_INVOICE_BILL_ID_SUCCESS,
    payload:data,
})
export const  getInvoicePartydetailsFailure = (error) =>({
    type:GET_INVOICE_BILL_ID_REQUEST,
    payload:error,
})

// export const getcurrencyRequest = () =>({
//     type:CURRENCY_REQUEST
// });
// export const getcurrencySuccess = (data) => ({
//     type:CURRENCY_SUCCESS,
//     payload:data,
// });
// export const getcurrencyFailure = (error) => ({
//     type:CURRENCY_SUCCESS,
//     payload:error,
// });