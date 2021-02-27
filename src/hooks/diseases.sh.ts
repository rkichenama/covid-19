import { useEffect, useLayoutEffect, useReducer } from 'react';
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

export const useNytHistoryByState = (state: string, reload: number = 10) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<NYTStateData>, FetchingState<NYTStateData>>(
    mergeReducer, undefined, initializer<NYTStateData>()
  );
  const updates = useInterval(reload * 60);
  const fetch = (state: string) => {
    dispatch({
      loading: true, loaded: false, error: undefined, data: []
    });
    nytHistoryByState(state)
      .then(
        list => { dispatch({
          loading: false, loaded: true, error: undefined,
          data: list
        }); }
      );
  };

  useEffect(() => {
    if (state) {
      fetch(state);
    }
  }, [ state ]);
  useLayoutEffect(() => {
    if (state && updates) {
      fetch(state);
    }
  }, [ state, updates ]);

  return { data, loading, loaded, error };
}

const StateColors = {
  'New York': '#008BC4', // celebration blue
  'Texas': '#a04039', // firecracker
  'Florida': '#e1bc8a', // royal gold
  'Kentucky': '#ffe39b', // roasted corn
  'Tennessee': '#e39b96', // sunset pink
  'California': '#26ad8d', // enchanted wells
};
export const useNytHistoryChartByStates = (states: string[], type: 'deaths' | 'cases' = 'deaths', reload: number = 10) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<DataSet>, FetchingState<DataSet>>(
    mergeReducer, undefined, initializer<DataSet>()
  );
  const updates = useInterval(reload * 60);

  const fetch = async (states: string[], type: 'deaths' | 'cases', dispatchCopy: Function) => {
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


  useEffect(() => {
    let dispatchCopy = dispatch;
    if (states.length) {
      dispatchCopy && dispatchCopy({
        loading: true, loaded: false, error: undefined, data: []
      });
      fetch(states, type, dispatchCopy);
    }
    return () => {
      dispatchCopy = undefined;
    };
  }, [ states.sort().join('|'), type ]);
  useLayoutEffect(() => {
    let dispatchCopy = dispatch;
    if (states.length && updates) {
      dispatchCopy && dispatchCopy({
        loading: true, loaded: false, error: undefined, data: []
      });
      fetch(states, type, dispatchCopy);
    }
    return () => {
      dispatchCopy = undefined;
    };
  }, [ states.sort().join('|'), type, updates ]);
  return { datasets: data, loading, loaded, error };
}

export const useNytUSHistoryChart = (type: 'deaths' | 'cases' = 'deaths', reload: number = 10) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<DataSet>, FetchingState<DataSet>>(
    mergeReducer, undefined, initializer<DataSet>()
  );
  const updates = useInterval(reload * 60);
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

  useEffect(() => {
    fetch(type);
  }, [ type ]);
  useLayoutEffect(() => {
    if (updates) {
      fetch(type);
    }
  }, [ type, updates ]);

  return { data, loading, loaded, error };
}
