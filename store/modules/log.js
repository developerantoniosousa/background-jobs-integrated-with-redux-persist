import produce from 'immer';

const INITIAL_STATE = {
  data: [],
};

export const ActionTypes = {
  ADD_LOG: '@log/ADD_LOG',
};

export const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === ActionTypes.ADD_LOG) {
    return produce(state, draft => {
      draft.data.push(action.payload.log);
    });
  }

  return state;
};

export const ActionCreators = {
  addLog: log => ({ type: ActionTypes.ADD_LOG, payload: { log } }),
};
