import { VENDOR_UPDATE_FAILURE, VENDOR_UPDATE_REQUEST, VENDOR_UPDATE_SUCCESS ,  FETCH_COUNTRIES_SUCCESS,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CITIES_SUCCESS,FETCH_VENDOR_BY_ID_REQUEST,
FETCH_VENDOR_BY_ID_SUCCESS,FETCH_VENDOR_BY_ID_FAILURE} from "../Type"

const initialState = {
    loading:null,
    vendors: [],
    error:null,
    countries: [],
    currencies: [],
    cities: [],singleVendor: null,
    
}

const vendorReducer = (state = initialState,action) => {
    switch(action.type){
    case VENDOR_UPDATE_REQUEST:
        return{
            ...state,loading:true, error:null
        }
        case VENDOR_UPDATE_SUCCESS:
            return{
                ...state, loading:false, vendors: action.payload,
            }
            case VENDOR_UPDATE_FAILURE:
                return{
                    ...state, loading:false, error:action.payload,
                }
                 case FETCH_COUNTRIES_SUCCESS:
             return { ...state, countries: action.payload };
             case FETCH_CURRENCIES_SUCCESS:
               return { ...state, currencies: action.payload };
             case FETCH_CITIES_SUCCESS:
               return { ...state, cities: action.payload };
                 case FETCH_VENDOR_BY_ID_REQUEST:
      return { ...state, loading: true };
    case FETCH_VENDOR_BY_ID_SUCCESS:
      return { ...state, loading: false, singleVendor: action.payload };
    case FETCH_VENDOR_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
                default:
                   return state
}
}

export default vendorReducer;


// import {
//   FETCH_COUNTRIES_SUCCESS,
//   FETCH_CURRENCIES_SUCCESS,
//   FETCH_CITIES_SUCCESS,
// } from '../Action_file/MetaAction';

// const initialState = {
//   countries: [],
//   currencies: [],
//   cities: [],
// };

// const metaReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_COUNTRIES_SUCCESS:
//       return { ...state, countries: action.payload };
//     case FETCH_CURRENCIES_SUCCESS:
//       return { ...state, currencies: action.payload };
//     case FETCH_CITIES_SUCCESS:
//       return { ...state, cities: action.payload };
//     default:
//       return state;
//   }
// };

// export default metaReducer;
