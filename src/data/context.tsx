import React from 'react';
import { MenuAction, useCovidReducer } from './reducer';

export type CovidState = {
  type: 'cases' | 'deaths',
  includeUS: boolean,
  states: string[],
  logScale: boolean
}
interface CovidType extends CovidState {
  dispatch?: React.Dispatch<MenuAction>
}
const defaultValue = {
  dispatch: () => {},
  type: 'deaths',
  includeUS: true,
  logScale: false,
  states: [
    'New York',
    'Texas',
    'Florida',
    'Kentucky',
    'Tennessee',
    'California',
  ]
} as CovidType;
const CovidContext = React.createContext(defaultValue);

export default CovidContext;

export const CovidProvider: React.FC<{ children: any }> = ({ children }) => {
  const [ value, dispatch ] = useCovidReducer(defaultValue);

  return (
    <CovidContext.Provider value={{ ...value, dispatch }} >
      { children }
    </CovidContext.Provider>
  );
};