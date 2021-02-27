import { useReducer } from 'react';
import { CovidState } from './context';

export type MenuAction = {
  type: string,
  payload: any
}
type ReducerType = (state: CovidState, action: MenuAction) => CovidState;

export const Actions = {
  changeType: 'changeType',
  toggleScale: 'toggleScale',
  includeUS: 'includeUS',
  upStates: 'upStates'
};
const Mutations = {
  [Actions.changeType]: (state: CovidState, { payload }: MenuAction) => ({ ...state, type: payload as string }),
  [Actions.toggleScale]: (state: CovidState, { payload }: MenuAction) => ({ ...state, logScale: payload as boolean }),
  [Actions.includeUS]: (state: CovidState, { payload }: MenuAction) => ({ ...state, includeUS: payload as boolean }),
  [Actions.upStates]: (state: CovidState, { payload }: MenuAction) => ({ ...state, states: payload as string[] })
}

const initializer = ({
  type = 'deaths', includeUS = false, logScale = false, states = []
}: CovidState) => ({ type, logScale, includeUS, states } as CovidState);
const reducer = (state, action) => {
  const mutation = Mutations[action.type];
  if (mutation) { return mutation(state, action); }
  return state;
};
export const useCovidReducer = (init?: CovidState) => useReducer<ReducerType, CovidState>(reducer, init, initializer);
