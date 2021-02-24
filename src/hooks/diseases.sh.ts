import { useEffect, useReducer } from 'react';
import { nytHistoryByState } from '../data/disease.sh';

type FetchingState<T extends any> = {
  data: T[],
  loading: boolean,
  loaded: boolean,
  error: any
}
type FetchingReducer<T extends any> = (state: FetchingState<T>, change: FetchingState<T>) => FetchingState<T>

export const useNytHistoryByState = (state: string, reload?: number) => {
  const [
    { data, loading, loaded, error }, dispatch
  ] = useReducer<FetchingReducer<NYTStateData>, FetchingState<NYTStateData>>(
    (state, change) => ({ ...state, ...change }), undefined,
    () => ({
      data: [],
      loading: false,
      loaded: false,
      error: undefined
    } as FetchingState<NYTStateData>)
  );

  useEffect(() => {
    if (state) {
      dispatch({
        loading: true, loaded: false, error: undefined, data: []
      });
      nytHistoryByState(state)
        .then(
          list => { dispatch({
            loading: false, loaded: true, error: undefined,
            data: list
          }); }
        )
    }
  }, [ state ]);

  return { data, loading, loaded, error };
}