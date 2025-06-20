// src/Reducers/loaderReducer.js
const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { loading: true };
    case 'CLEAR_LOADING':
      return { loading: false };
    default:
      return state;
  }
};

export default loaderReducer;
