// client/src/redux/actions/paymentActions.js

import apiService from '../../services-api/apiService';

export const createPayment = (data) => async (dispatch) => {
  dispatch({ type: 'CREATE_PAYMENT_REQUEST' });
  try {
    const response = await apiService.createOrder(data);
    dispatch({ type: 'CREATE_PAYMENT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_PAYMENT_FAILURE', payload: error.message });
  }
};