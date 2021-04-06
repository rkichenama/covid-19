import { useEffect, useLayoutEffect, useReducer, useCallback } from 'react';
import { nytHistoryByState, nytHistoryUS } from '../data/disease.sh';
import { chartableDiseaseData } from '../data/transforms';
import { useInterval } from './time';

type FetchingState<T extends any> = {
  data: T[],
  loading: boolean,
  loaded: boolean,
  error: any
}
type FetchingReducer<T extends any> = (state: FetchingState<T>, change: FetchingState<T>) => FetchingState<T>

const mergeReducer = (state, change) => ({ ...state, ...change });
const initializer = <T extends any>() => () => ({
  data: [],
  loading: false,
  loaded: false,
  error: undefined
} as FetchingState<T>);

// export const useNytHistoryByState = (state: string, reload: number = 10) => {
//   const [
//     { data, loading, loaded, error }, dispatch
//   ] = useReducer<FetchingReducer<NYTStateData>, FetchingState<NYTStateData>>(
//     mergeReducer, undefined, initializer<NYTStateData>()
//   );
//   const fetch = (state: string) => {
//     dispatch({ loading: true, loaded: false, error: undefined, data: [] });
//     nytHistoryByState(state)
//       .then(
//         list => { dispatch({
//           loading: false, loaded: true, error: undefined,
//           data: list
//         }); }
//       );
//   };
//   const doFetch = useCallback(() => {
//     fetch(state);
//   }, [ state ]);
//   useInterval(reload * 60, doFetch);

//   return { data, loading, loaded, error };
// }

const StateColors = {
  'New York': '#008BC4', // celebration blue
  'Alabama': '#996633',
  'Arizona': '#16256b',
  'California': '#000080',
  'Delaware': '#71a1a0',
  'Florida': '#cc6500',
  'Georgia': '#993366',
  'Hawaii': '#f00c0f',
  'Idaho': '#339966',
  'Indiana': '#0000cc',
  'Kentucky': '#ffe39b', // roasted corn
  'Louisiana': '#c41e3a',
  'Maryland': '#336699',
  'Massachusetts': '#0000ff',
  'Minnesota': '#800080',
  'Nevada': '#c0c0c0',
  'New Hampshire': '#fa500',
  'New Jersey': '#f0dc82',
  'New Mexico': '#ffff00',
  'North Carolina': '#cc0000',
  'Ohio': '#0000ff',
  'Oklahoma': '#008000',
  'Oregon': '#ccac00',
  'Pennsylvania': '#008800',
  'South Carolina': '#00416a',
  'South Dakota': '#ffd700',
  'Tennessee': '#ff7f00',
  'Texas': '#ff0000',
  'Utah': '#ffcc33',
  'Vermont': '#006400',
  'West Virginia': '#cfb53b',
  'Wyoming': '#a52a2a'
};
export const useNytHistoryChartByStates = (states: string[], type: 'deaths' | 'cases' = 'deaths', reload: number = 10) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<DataSet>, FetchingState<DataSet>>(
    mergeReducer, undefined, initializer<DataSet>()
  );

  const fetch = async (states: string[], type: 'deaths' | 'cases', dispatchCopy: Function) => {
    dispatchCopy && dispatchCopy({
      loading: true, loaded: false, error: undefined, data: []
    });
    const list = await Promise.all(
      states.map(
        state => nytHistoryByState(state)
          .then(stateData => ({
            name: state,
            color: StateColors[state] || 'lightgray',
            data: chartableDiseaseData(stateData)(type)
          } as DataSet))
      )
    )
    dispatchCopy && dispatchCopy({
      loading: false, loaded: true, error: undefined,
      data: list
    });
  };
  const doFetch = useCallback(() => {
    fetch(states, type, dispatch);
  }, [ states.sort().join('|'), type, dispatch ]);
  useInterval(reload * 60, doFetch);

  return { datasets: data, loading, loaded, error };
}

export const useNytUSHistoryChart = (type: 'deaths' | 'cases' = 'deaths', reload: number = 10) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<DataSet>, FetchingState<DataSet>>(
    mergeReducer, undefined, initializer<DataSet>()
  );
  const fetch = (type: 'deaths' | 'cases') => {
    dispatch({
      loading: true, loaded: false, error: undefined, data: []
    });
    nytHistoryUS()
      .then(
        list => { dispatch({
          loading: false, loaded: true, error: undefined,
          data: [{
            name: 'United States',
            color: 'cyan',
            data: chartableDiseaseData(list)(type)
          } as DataSet]
        }); }
      );
  };
  const doFetch = useCallback(() => {
    fetch(type);
  }, [ type ]);
  useInterval(reload * 60, doFetch);

  return { data, loading, loaded, error };
}
