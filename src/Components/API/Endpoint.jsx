const BASE_URL = "https://hastin-container.com/staging/api";

const apiEndpoints = {
  CREATE_VENDOR: `${BASE_URL}/vendor/create`,
  UPDATE_VENDOR: `${BASE_URL}/vendor/update`,
  GET_VENDOR_BY_ID: (vendorId) => `${BASE_URL}/vendor/get/${vendorId}`,
  FETCH_ACTIVE_VENDORS: `${BASE_URL}/vendor/search/active`,
  FETCH_INACTIVE_VENDORS: `${BASE_URL}/vendor/search/inactive`,
  MARK_INACTIVE: (vendorId) => `${BASE_URL}/vendor/inactive/${vendorId}`,
  MARK_ACTIVE: (vendorId) => `${BASE_URL}/vendor/active/${vendorId}`,

  CREATE_CONTACT: `${BASE_URL}/vendor/contact/create`,
  UPDATE_CONTACT: `${BASE_URL}/vendor/contact/update`,
  DELETE_CONTACT: (contactId, createdBy) =>
    `${BASE_URL}/vendor/contact/delete/${contactId}/${createdBy}`,

  GET_COUNTRIES: `${BASE_URL}/meta/country`,
  GET_CURRENCIES: `${BASE_URL}/meta/currencies`,
  GET_CITIES: `${BASE_URL}/countryCities/get`,

  GET_BOOKINGS:`${BASE_URL}/soc/booking//search-all/active/bookings`,
  GET_INVOICEBILL: (id)=>`${BASE_URL}/accouting/soc/export/get/${id}`

};

export default apiEndpoints;
