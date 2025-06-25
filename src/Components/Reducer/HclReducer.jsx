import { GET_BOOKING_LIST_FAILURE, GET_BOOKING_LIST_REQUEST, GET_BOOKING_LIST_SUCCESS } from "../Type"



const initialState = {
user:[],
loading:null,
error:null,
};
 const hclReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_BOOKING_LIST_REQUEST:
            return{...state, loading:true, error:false}
            case GET_BOOKING_LIST_SUCCESS:
                return{...state, loading:false, user:action.payload}
                case GET_BOOKING_LIST_FAILURE:
                    return {...state, loading:false, error:action.payload}
    }
 };
 export default hclReducer;