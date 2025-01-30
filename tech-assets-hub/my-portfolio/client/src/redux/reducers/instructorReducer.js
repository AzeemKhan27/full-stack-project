//client/src/redux/reducers/instructorReducer.js

const initialState = {
    instructors: [],
    loading: false,
    error: null,
  };
  
  const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_INSTRUCTORS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_INSTRUCTORS_SUCCESS':
        return { ...state, loading: false, instructors: action.payload };
      case 'FETCH_INSTRUCTORS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default instructorReducer;