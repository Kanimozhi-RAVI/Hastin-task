import {
  VENDOR_UPDATE_FAILURE,
  VENDOR_UPDATE_REQUEST,
  VENDOR_UPDATE_SUCCESS,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CITIES_SUCCESS,
  FETCH_VENDOR_BY_ID_REQUEST,
  FETCH_VENDOR_BY_ID_SUCCESS,
  FETCH_VENDOR_BY_ID_FAILURE,
  UPDATE_VENDOR_BY_ID_REQUEST,
  UPDATE_VENDOR_BY_ID_SUCCESS,
  UPDATE_VENDOR_BY_ID_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  PUT_CONTACT_REQUEST,
  PUT_CONTACT_SUCCESS,
  PUT_CONTACT_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  FETCH_INACTIVE_VENDORS_REQUEST,
  FETCH_INACTIVE_VENDORS_SUCCESS,
  FETCH_INACTIVE_VENDORS_FAILURE,
  MARK_INACTIVE_REQUEST,
  MARK_INACTIVE_SUCCESS,
  MARK_INACTIVE_FAILURE,
  CREATE_VENDOR_REQUEST,
  CREATE_VENDOR_SUCESSS,
  CREATE_VENDOR_FAILURE,
} from "../Types_File/VendorType";

const initialState = {
  loading: null,
  vendors: [],
  error: null,
  countries: [],
  currencies: [],
  cities: [],
  singleVendor: null,
  updateSuccess: false,
  contactDeleteLoading: false,
  contactDeleteError: null,
  details: [],
   inactiveVendors: [],
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case VENDOR_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VENDOR_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        vendors: action.payload,
      };

    case VENDOR_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload };

    case FETCH_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.payload };

    case FETCH_CITIES_SUCCESS:
      return { ...state, cities: action.payload };

    case FETCH_VENDOR_BY_ID_REQUEST:
      return { ...state, loading: true };

    case FETCH_VENDOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleVendor: action.payload,
        details: action.payload,
      };

    case FETCH_VENDOR_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };





      case CREATE_VENDOR_REQUEST:
        return{
          ...state, loading :true, error:null 
        }
        case CREATE_VENDOR_SUCESSS:
          return{
            ...state, loading:false,  vendor: action.payload,
          }
          case CREATE_VENDOR_FAILURE:
            return{
              ...state, loading:false, error:action.payload,
            }
 



    case UPDATE_VENDOR_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        updateSuccess: false,
        error: null,
      };

    case UPDATE_VENDOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        singleVendor: action.payload,
      };

    case UPDATE_VENDOR_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        error: action.payload,
      };

    case PUT_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

   // In reducer (example)
case PUT_CONTACT_SUCCESS:
  return {
    ...state,
    contactList: (state.contactList || []).map((c) =>
      c.id === action.payload.id ? action.payload : c
    ),
  };



    case PUT_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CONTACT_REQUEST:
      return {
        ...state,
        contactDeleteLoading: true,
        contactDeleteError: null,
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contactDeleteLoading: false,
        singleVendor: {
          ...state.singleVendor,
          contactList: state.singleVendor.contactList.filter(
            (c) => c.id !== action.payload
          ),
        },
      };

    case DELETE_CONTACT_FAILURE:
      return {
        ...state,
        contactDeleteLoading: false,
        contactDeleteError: action.payload,
      };

    case CREATE_CONTACT_REQUEST:
      return { ...state, loading: true };

    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleVendor: {
          ...state.singleVendor,
          contactList: [
            ...(state.singleVendor?.contactList || []),
            action.payload,
          ],
        },
      };

    case CREATE_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };


    case FETCH_INACTIVE_VENDORS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_INACTIVE_VENDORS_SUCCESS:
      return { ...state, loading: false, inactiveVendors: action.payload };

    case FETCH_INACTIVE_VENDORS_FAILURE:
      return { ...state, loading: false, error: action.payload };


       case MARK_INACTIVE_REQUEST:
      return { ...state, loading: true, error: null };

    case MARK_INACTIVE_SUCCESS:
      return { ...state, loading: false, inactiveVendors: action.payload };

    case MARK_INACTIVE_FAILURE:
      return { ...state, loading: false, error: action.payload };

   default:
      return state;
  }
};

export default vendorReducer;
