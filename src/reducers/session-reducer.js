import produce from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  contributor: 'Anonymous',
  companies: [null],
};

const sessionReducer = (state = initialState, action) => produce(state, (draft) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.ADD_COMPANY: {
      const { idx, element } = action.payload;
      if (!state.companies.includes(element)) {
        draft.companies[idx] = element;
      }
      break;
    }
    case ActionTypes.RENAME_CONTRIBUTOR:
      draft.contributor = action.payload;
      break;
    case ActionTypes.RESET_SESSION:
      draft.contributor = 'anonymous';
      draft.companies = [null];
  }
});

export default sessionReducer;
