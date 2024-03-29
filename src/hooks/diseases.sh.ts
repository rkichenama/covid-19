import { useEffect, useLayoutEffect, useState, useReducer, useCallback } from 'react';
import { nytHistoryByState, nytHistoryUS, vaccines } from '../data/disease.sh';
import { chartableDiseaseData, chartableVaccineData } from '../data/transforms';
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

export const StateColors = {
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

export const StateColor = (name: string) => {
  const matcher = new RegExp(name, 'i');
  const key = Object.keys(StateColors).find(key => matcher.test(key));
  if (key) {
    return StateColors[key];
  }
  return 'gray';
}

const useNytHistoryByState = (reload: number, states: string[]) => {
  const [
    state, dispatch
  ] = useReducer<FetchingReducer<NYTStateData[]>, FetchingState<NYTStateData[]>>(
    mergeReducer, undefined, initializer<NYTStateData[]>()
  );

  useInterval(reload * 60, useCallback(async () => {
    dispatch({
      ...state,
      loading: true, loaded: false, error: undefined
    });
    const list = await Promise.all(states.map(state => nytHistoryByState(state)));
    dispatch({
      ...state,
      loading: false, loaded: true, error: undefined,
      data: list
    });
  }, [ dispatch, states.join('|') ]));

  return state;
};
export const useNytHistoryChartByStates = (states: string[], type: 'deaths' | 'cases' = 'deaths', useDelta: boolean = false, reload: number = 10) => {
  const { data, loading, loaded, error } = useNytHistoryByState(reload, states);
  const [ chartData, setChartData ] = useState([] as DataSet[]);

  useEffect(() => {
    setChartData(states.map((state, idx) => ({
      name: state,
      color: StateColors[state] || 'lightgray',
      data: chartableDiseaseData(data[idx])(type, useDelta)
    } as DataSet)));
  }, [ data, type, useDelta ]);

  return { datasets: chartData, loading, loaded, error };
}

const useNytUSHistory = (reload: number) => {
  const [
    state, dispatch
  ] = useReducer<FetchingReducer<NYTCountryData>, FetchingState<NYTCountryData>>(
    mergeReducer, undefined, initializer<NYTCountryData>()
  );

  useInterval(reload * 60, useCallback(async () => {
    dispatch({
      ...state,
      loading: true, loaded: false, error: undefined
    });
    const list = await nytHistoryUS();
    dispatch({
      ...state,
      loading: false, loaded: true, error: undefined,
      data: list
    });
  }, [ dispatch ]));

  return state;
};
export const useNytUSHistoryChart = (type: 'deaths' | 'cases' = 'deaths', useDelta: boolean = false, reload: number = 10) => {
  const { data, loading, loaded, error } = useNytUSHistory(reload);
  const [ chartData, setChartData ] = useState([] as DataSet[]);

  useEffect(() => {
    setChartData([{
      name: 'United States',
      color: 'cyan',
      data: chartableDiseaseData(data)(type, useDelta)
    } as DataSet]);
  }, [ data, type, useDelta ]);

  return { data: chartData, loading, loaded, error };
}

const useJhuUSVaccines = (reload: number) => {
  const [
    state, dispatch
  ] = useReducer<FetchingReducer<JHUVaccineData>, FetchingState<JHUVaccineData>>(
    mergeReducer, undefined, initializer<JHUVaccineData>()
  );

  useInterval(reload * 60, useCallback(async () => {
    dispatch({
      ...state,
      loading: true, loaded: false, error: undefined
    });
    const item = await vaccines();
    dispatch({
      ...state,
      loading: false, loaded: true, error: undefined,
      data: [ item ]
    });
  }, [ dispatch ]));

  return state;
};
export const useJhuUSVaccinesChart = (reload: number = 10) => {
  const { data, loading, loaded, error } = useJhuUSVaccines(reload);
  const [ chartData, setChartData ] = useState([] as DataSet[]);

  useEffect(() => {
    setChartData([{
      name: 'US Vaccine Rollout',
      color: 'magenta',
      data: chartableVaccineData(data[0]?.timeline)
    } as DataSet]);
  }, [ data ]);

  return { data: chartData, loading, loaded, error };
};
