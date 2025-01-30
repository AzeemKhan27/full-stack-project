//client/src/redux/reducers/paymentReducer.js

const initialState = {
    payments: [],
    loading: false,
    error: null,
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_PAYMENT_REQUEST':
        return { ...state, loading: true, error: null };
      case 'CREATE_PAYMENT_SUCCESS':
        return { ...state, loading: false, payments: [...state.payments, action.payload] };
      case 'CREATE_PAYMENT_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default paymentReducer;