import { GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS, GET_INVOICE_BILL_ID_FAILURE, GET_INVOICE_BILL_ID_REQUEST, GET_INVOICE_BILL_ID_SUCCESS, GET_INVOICEBILL_FAILURE, GET_INVOICEBILL_REQUEST, GET_INVOICEBILL_SUCCESS } from "../Type"


const initialState = {
  bookinguser: [],
  loading: false,
  error: null,
  invoice:"",
  invoiceId:[],
};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookinguser: action.payload
      };
    case GET_BOOKING_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

      case GET_INVOICEBILL_REQUEST:
        return{
          ...state,loading:true, error:null,
        };
        case GET_INVOICEBILL_SUCCESS:
          return {
        ...state,
        invoice:action.payload,
        loading: false,
      };
           case GET_INVOICEBILL_FAILURE:
          return{
            ...state,loading:false, error:action.payload,
          }

          case GET_INVOICE_BILL_ID_REQUEST:
            return{
              ...state,
              loading:true,
              error:null,
            }
            case GET_INVOICE_BILL_ID_SUCCESS:
              return{
                ...state,
                loading:false,
                invoiceId:action.payload,
              }
              case GET_INVOICE_BILL_ID_FAILURE:
                return{
                  ...state,
                  loading:false,
                  error:action.payload,
                }
    default:
      return state; 
  }
};

export default userlistReducer;
