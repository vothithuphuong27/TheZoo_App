import * as ActionTypes from '../actions/types';
const defaultState = {count: 0};

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COUNT:
      return {
        count: state.count + action.number,
      };
    default:
      return state;
  }
}
