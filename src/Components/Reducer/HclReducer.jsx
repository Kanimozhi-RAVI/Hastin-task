import {
  GET_BOOKING_LIST_REQUEST,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_LIST_FAILURE,
  GET_INVOICEBILL_REQUEST,
  GET_INVOICEBILL_SUCCESS,
  GET_INVOICEBILL_FAILURE,
  GET_INVOICE_BILL_ID_REQUEST,
  GET_INVOICE_BILL_ID_SUCCESS,
  GET_INVOICE_BILL_ID_FAILURE,
  HEAD_REQUEST,
  HEAD_FAILURE,
  HEAD_SUCCESS,
  GET_AGENT_REQUEST,
  GET_AGENT_FAILURE,
  GET_AGENT_SUCCESS
} from "../Types_File/HclType";

const initialState = {
  bookinguser: [],
  invoice: {}, 
  invoiceDetail: {}, 
  loading: false,
  error: null,
  header:[],
  agent:[],
};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST:
    case GET_INVOICEBILL_REQUEST:
    case GET_INVOICE_BILL_ID_REQUEST:
      case HEAD_REQUEST:
        case GET_AGENT_REQUEST:

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
      case HEAD_FAILURE:
        case GET_AGENT_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case HEAD_SUCCESS:
       return {
        ...state,
        loading:false,
        header:action.payload
       }
       case GET_AGENT_SUCCESS:
        return{
          ...state,
          loading:false,
          agent:action.payload
        }

    default:
      return state;
  }
};

export default userlistReducer;
