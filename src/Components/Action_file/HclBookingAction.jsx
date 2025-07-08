import { BOOKING_AGENT_FAILURE, BOOKING_AGENT_REQUEST, BOOKING_AGENT_SUCCESS, CURRENCY_REQUEST, CURRENCY_SUCCESS, GET_AGENT_FAILURE, GET_AGENT_REQUEST, GET_AGENT_SUCCESS, GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICE_BILL_ID_SUCCESS, 
    GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST, GET_INVOICEBILL_SUCCESS, 
    HEAD_FAILURE, 
    HEAD_REQUEST,
    HEAD_SUCCESS} from "../Types_File/HclType";


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


export const getHeaderRequest = () =>({
    type:HEAD_REQUEST
});
export const getHeaderSuccess = (data) =>({
    type:HEAD_SUCCESS,
    payload:data,
});
export const getHeaderFailure = (error) => ({
    type:HEAD_FAILURE,
    payload:error,
});
export const getAgentRequest =() =>({
    type:GET_AGENT_REQUEST
})
export const getAgentSuccess =(data) =>({
    type:GET_AGENT_SUCCESS,
    payload:data,
})
export const getAgentFailure =(error) =>({
    type:GET_AGENT_FAILURE,
    payload:error,
})

export const getBookingAgentRequest = ()=>({
    type:BOOKING_AGENT_REQUEST
})
export const getBookingAgentSuccess = (data)=>({
    type:BOOKING_AGENT_SUCCESS,
    payload:data,
})
export const getBookingAgentFailure = (error)=>({
    type:BOOKING_AGENT_FAILURE,
    payload:error,
})