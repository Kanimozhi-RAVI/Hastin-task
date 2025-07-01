import {
  GET_BOOKING_LIST_REQUEST,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_LIST_FAILURE,
  GET_INVOICEBILL_REQUEST,
  GET_INVOICEBILL_SUCCESS,
  GET_INVOICEBILL_FAILURE,
  GET_INVOICE_BILL_ID_REQUEST,
  GET_INVOICE_BILL_ID_SUCCESS,
  GET_INVOICE_BILL_ID_FAILURE
} from "../Types_File/HclType";

const initialState = {
  bookinguser: [],
  invoice: {}, // holds all invoices & bills
  invoiceDetail: {}, // holds specific invoice by ID
  loading: false,
  error: null,
};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST:
    case GET_INVOICEBILL_REQUEST:
    case GET_INVOICE_BILL_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookinguser: action.payload,
      };

    case GET_INVOICEBILL_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload, // contains invoices & bills
      };

    case GET_INVOICE_BILL_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        invoiceDetail: action.payload, // specific invoice detail
      };

    case GET_BOOKING_LIST_FAILURE:
    case GET_INVOICEBILL_FAILURE:
    case GET_INVOICE_BILL_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userlistReducer;
