import { VENDOR_UPDATE_FAILURE, VENDOR_UPDATE_REQUEST, VENDOR_UPDATE_SUCCESS,FETCH_COUNTRIES_REQUEST,FETCH_COUNTRIES_SUCCESS,FETCH_CITIES_REQUEST,FETCH_CITIES_SUCCESS,FETCH_CURRENCIES_REQUEST,FETCH_CURRENCIES_SUCCESS,
    FETCH_VENDOR_BY_ID_REQUEST,FETCH_VENDOR_BY_ID_FAILURE,FETCH_VENDOR_BY_ID_SUCCESS,
  
  UPDATE_VENDOR_BY_ID_REQUEST,
  UPDATE_VENDOR_BY_ID_SUCCESS,
  UPDATE_VENDOR_BY_ID_FAILURE,
  CREATE_VENDOR_REQUEST,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  PUT_CONTACT_REQUEST,
  PUT_CONTACT_SUCCESS,
  PUT_CONTACT_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
 } from "../Type"

export const vendorUpdateRequest = (payload) => ({
type:VENDOR_UPDATE_REQUEST,
payload,
})
export const vendorUpdateSuccess = (vendors) => ({
type:VENDOR_UPDATE_SUCCESS,
payload:vendors,
})
export const vendorUpdateFailure = (error) => ({
type:VENDOR_UPDATE_FAILURE,
payload:error
})

export const fetchCountriesRequest = () => ({ type: FETCH_COUNTRIES_REQUEST });
export const fetchCurrenciesRequest = () => ({ type: FETCH_CURRENCIES_REQUEST });
export const fetchCitiesRequest = () => ({ type: FETCH_CITIES_REQUEST });

export const fetchCountriesSuccess = (data) => ({ type: FETCH_COUNTRIES_SUCCESS, payload: data });
export const fetchCurrenciesSuccess = (data) => ({ type: FETCH_CURRENCIES_SUCCESS, payload: data });
export const fetchCitiesSuccess = (data) => ({ type: FETCH_CITIES_SUCCESS, payload: data });



export const fetchVendorByIdRequest = (payload) => ({
  type: FETCH_VENDOR_BY_ID_REQUEST,
  payload,
});

export const fetchVendorByIdSuccess = (data) => ({
  type: FETCH_VENDOR_BY_ID_SUCCESS,
  payload: data,
});

export const fetchVendorByIdFailure = (error) => ({
  type: FETCH_VENDOR_BY_ID_FAILURE,
  payload: error,
});

export const updateVendorByIdRequest = (payload) => ({
  type: UPDATE_VENDOR_BY_ID_REQUEST,
  payload,
});

export const updateVendorByIdSuccess = (data) => ({
  type: UPDATE_VENDOR_BY_ID_SUCCESS,
  payload: data,
});

export const updateVendorByIdFailure = (error) => ({
  type: UPDATE_VENDOR_BY_ID_FAILURE,
  payload: error,
});
export const createVendorRequest = (payload) => ({
  type: CREATE_VENDOR_REQUEST,
  payload
});
// export const updateVendorByIdRequest = (id) => ({
//   type: UPDATE_VENDOR_BY_ID_REQUEST,
//   payload:{id}
// });
export const createContactRequest = (payload) => ({
  type: CREATE_CONTACT_REQUEST,
  payload,
});

export const createContactSuccess = (data) => ({
  type: CREATE_CONTACT_SUCCESS,
  payload: data,
});

export const createContactFailure = (error) => ({
  type: CREATE_CONTACT_FAILURE,
  payload: error,
});


export const putcontactRequest = (payload) => ({
  type:PUT_CONTACT_REQUEST,
  payload,
});
export const putcontactSuccess = (data) => ({
  type:PUT_CONTACT_SUCCESS,
  payload:data,
});
export const putcontactFailure = (error) => ({
  type:PUT_CONTACT_FAILURE,
  payload:error,
});



export const deleteContactRequest = (vendorId, contactId) => ({
  type: DELETE_CONTACT_REQUEST,
  payload: { vendorId, contactId },
});

export const deleteContactSuccess = (contactId) => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: contactId,
});

export const deleteContactFailure = (error) => ({
  type: DELETE_CONTACT_FAILURE,
  payload: error,
});
