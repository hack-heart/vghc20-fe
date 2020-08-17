import axios from 'axios';

export const ROOT_URL = 'https://vghc20-api.herokuapp.com/api';

export const ActionTypes = {
  FETCH_COMPANIES: 'companies/fetchCompanies',
  ADD_COMMENTS: 'companies/addComments',
  FETCH_COMPANY_AND_COMMENTS: 'companies/fetchCompanyAndComments',
  SET_ERROR: 'error/setError',
  CLEAR_ERROR: 'error/clearError',
  SEARCH_COMPANIES: 'companies/searchCompanies',
  ADD_COMPANY: 'session/addCompany',
  RENAME_CONTRIBUTOR: 'session/renameContributor',
  RESET_SESSION: 'session/resetSession',
};

export function fetchCompanies() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/companies`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_COMPANIES, payload: response.data });
        dispatch({ type: ActionTypes.CLEAR_ERROR });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  };
}

export function fetchCompanyAndComments(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/companies/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_COMPANY_AND_COMMENTS, payload: response.data });
        dispatch({ type: ActionTypes.CLEAR_ERROR });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  };
}

export function increaseCompanyTally() {
  return (dispatch, getState) => {
    const state = getState();
    const { session: { companies } } = state;
    const enteredData = companies.filter((name) => name !== null);
    axios.put(`${ROOT_URL}/companies`, enteredData)
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  };
}

export function addComment(name, comment) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/comments/${name}`, comment)
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
      });
  };
}

export function renameContributor(newName) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RENAME_CONTRIBUTOR, payload: newName });
  };
}

export function addCompany(idx, element) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_COMPANY, payload: { idx, element } });
  };
}

export function resetSession() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESET_SESSION });
  };
}
