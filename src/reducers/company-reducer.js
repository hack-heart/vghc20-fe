import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

// updates list of all companies and the current company on axios action
const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANIES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_COMPANY_AND_COMMENTS:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
