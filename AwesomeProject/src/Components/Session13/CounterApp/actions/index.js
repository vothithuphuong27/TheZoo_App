import * as ActionTypes from './types';
export const addcountaction = (number) => ({
  type: ActionTypes.ADD_COUNT,
  number: number,
});
export const subcountaction = (number) => ({
  type: ActionTypes.SUB_COUNT,
  number: number,
});
