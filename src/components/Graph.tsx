import React from 'react';
import Plot from './Plot';
import CovidContext from '../data/context';
import { useNytHistoryChartByStates, useNytUSHistoryChart } from '../hooks/diseases.sh';

const Graph: React.FC<any> = () => {
  const {
    type, includeUS, states
  } = React.useContext(CovidContext);
  const US = useNytUSHistoryChart(type);
  const { datasets, loading, loaded, error } = useNytHistoryChartByStates(states, type);
  const sets = React.useMemo(() => {
    const data = [];
    if (datasets.length) { data.push.apply(data, datasets); }
    if (includeUS && US.data.length) { data.push.apply(data, US.data); }
    return data;
  }, [ !loading && loaded, !US.loading && US.loaded, includeUS ]);

  return (
    error
      ? (error.toString())
      : !loading && loaded
        ? (<Plot {...{ datasets: sets }}/>)
        : ('Loading...')
  );
};

export default Graph;
