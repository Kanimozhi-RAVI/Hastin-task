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
  GET_AGENT_SUCCESS,
  BOOKING_AGENT_REQUEST,
  BOOKING_AGENT_SUCCESS,
  BOOKING_AGENT_FAILURE,
  FETCH_CHARGE_TABLE_REQUEST,
  FETCH_CHARGE_TABLE_SUCCESS,
  GET_CUSTOMER_DETAIL_REQUEST,
  GET_CUSTOMER_DETAIL_FAILURE
} from "../Types_File/HclType";

const initialState = {
  bookinguser: [],
  invoice: {}, 
  invoiceDetail: {}, 
  loading: false,
  error: null,
  header:[],
  agent:[],
  selectedCharge:[],
  taxMasters: [],
    chargeNames: [],
    suggestions: [],
  customerDetail: null,



};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST:
    case GET_INVOICEBILL_REQUEST:
    case GET_INVOICE_BILL_ID_REQUEST:
      case HEAD_REQUEST:
        case GET_AGENT_REQUEST:
          case BOOKING_AGENT_REQUEST:
            case FETCH_CHARGE_TABLE_REQUEST:

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
        invoice: action.payload, 
      };

    case GET_INVOICE_BILL_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        invoiceDetail: action.payload, 
      };
      case BOOKING_AGENT_SUCCESS:
        return{
          ...state, loading:false, bookinguser:action.payload,
        }
        case FETCH_CHARGE_TABLE_SUCCESS:
          return{
            ...state,loading:false,selectedCharge:action.payload,
          }

    case GET_BOOKING_LIST_FAILURE:
    case GET_INVOICEBILL_FAILURE:
    case GET_INVOICE_BILL_ID_FAILURE:
      case HEAD_FAILURE:
        case GET_AGENT_FAILURE:
          case BOOKING_AGENT_FAILURE:
            case GET_CUSTOMER_DETAIL_REQUEST:

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

    case 'FETCH_CHARGE_NAMES_SUCCESS':
      return { ...state, chargeNames: action.payload };
    case 'FETCH_TAX_MASTERS_SUCCESS':
      return { ...state, taxMasters: action.payload };
      case 'BILL_TO_REQUEST':
      return { ...state, loading: true , error:false};
    case 'BILL_TO_SUCCESS':
      console.log("✅ Reducer - Suggestions:", action.payload);
      return { ...state, loading: false, suggestions: action.payload };
    case 'BILL_TO_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'GET_CUSTOMER_DETAIL_SUCCESS':
      return { ...state, customerDetail: action.payload };
      case GET_CUSTOMER_DETAIL_FAILURE:
        return {
          ...state, loading:false, error:action.payload
        }

    default:
      return state;
  }
};

export default userlistReducer;
