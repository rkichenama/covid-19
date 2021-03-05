import React from 'react';
import Plot from './Plot';
import CovidContext from '../data/context';
import { useNytHistoryChartByStates, useNytUSHistoryChart } from '../hooks/diseases.sh';

const sum = (seed: number) => (total: number, { y }: ChartableData, i: number, list: ChartableData[]) => (
  total + Math.max(0, i ? (y - list[i - 1].y) : y - seed)
) as number;
const lastNAvg = (n: number) => (list: ChartableData[], from: number) => {
  const [ { y: seed }, ...items ] = list.slice(from - n - 1, from);
  return items.reduce(sum(seed), 0) / n;
};

const transformAsDeltas = (deltas: boolean, sets: DataSet[]) => {
  if (!deltas) { return sets; }
  const n = 7;
  const lastAvg = lastNAvg(n);
  return sets.map(({ data, ...rest }) => ({
    ...rest,
    data: data.map((point, i, list) => {
      if (i <= n) { return point; }
      const y = lastAvg(list, i);
      return { ...point, y };
    })
  }) )
}

const Graph: React.FC<any> = () => {
  const {
    type, includeUS, states, deltas
  } = React.useContext(CovidContext);
  const US = useNytUSHistoryChart(type);
  const { datasets, loading, loaded, error } = useNytHistoryChartByStates(states, type);
  const sets = React.useMemo(() => {
    let data = [];
    if (datasets.length) { data.push.apply(data, datasets); }
    if (includeUS && US.data.length) { data.push.apply(data, US.data); }
    return transformAsDeltas(deltas, data);
  }, [ !loading && loaded, !US.loading && US.loaded, includeUS, deltas ]);

  return (
    error
      ? (error.toString())
      : !loading && loaded
        ? (<Plot {...{ datasets: sets }}/>)
        : ('Loading...')
  );
};

export default Graph;
