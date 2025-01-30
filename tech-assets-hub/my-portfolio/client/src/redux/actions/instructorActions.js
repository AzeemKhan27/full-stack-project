// client/src/redux/actions/instructorActions.js

import apiService from '../../services-api/apiService';

export const fetchInstructors = () => async (dispatch) => {
  dispatch({ type: 'FETCH_INSTRUCTORS_REQUEST' });
  try {
    const response = await apiService.getInstructors();
    dispatch({ type: 'FETCH_INSTRUCTORS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_INSTRUCTORS_FAILURE', payload: error.message });
  }
};