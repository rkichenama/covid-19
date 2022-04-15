import React from 'react';
import orderBy from 'lodash/orderBy';
import KnownStates from './data/states.json';

export enum DataTypes {
  Cases = 'cases',
  Deaths = 'deaths'
}
export enum Options {
  ShowOverall = 'show-overall',
  Deltas = 'deltas',
  LogScale = 'log-scale'
}
type GlobalContext = {
  chartVerticalPadding: number,
  pandemicStart: Date,
  fromBottom: number,
  fromLeft: number,
  months: string[],
  dataType: DataTypes,
  options: Options[],
  textInChartFont: string,
  chartMetaColor: string,
  hoverValue: { date: Date, value: number },
  includeUS: boolean,
  isRelative: boolean,
  isLogScale: boolean,
  maxRange: number,
  selectedStates: string[],
  hoveredDataPoints: DataSet[],
  lineWidthMain: number,
  lineWidthGrid: number
};
export const GlobalContext = React.createContext<GlobalContext & { update: (options: Partial<GlobalContext>) => void }>(undefined);

export const fromHash = () => {
  let selectedStates = [];
  if (location.hash.length > 1) {
    selectedStates = decodeURIComponent(
      location.hash.slice(1)
    )
      .split(',')
      .filter(state => KnownStates.includes(state));
  }
  return selectedStates;
}
const Provider = ({ children }) => {
  const [ value, setValue ] = React.useState({
    chartVerticalPadding: 1.1,
    pandemicStart: new Date(2020, 0, 21),
    fromBottom: 32,
    fromLeft: 0,
    months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    dataType: DataTypes.Cases,
    options: [ Options.ShowOverall ],
    textInChartFont: '12px "Source Code Pro"',
    chartMetaColor: '#cccccc',
    hoverValue: { date: undefined, value: 0 },
    maxRange: 1032,
    selectedStates: [],
    hoveredDataPoints: [],
    lineWidthMain: 2.0,
    lineWidthGrid: 0.5
  } as GlobalContext);
  const update = React.useCallback((options: Partial<GlobalContext>) => {
    setValue(current => ({
      ...current,
      ...options
    }));
  }, [ setValue ]);
  const includeUS = React.useMemo(() => (
    value.options.includes(Options.ShowOverall)
  ), [ value.options ]);
  const isRelative = React.useMemo(() => (
    value.options.includes(Options.Deltas)
  ), [ value.options ]);
  const isLogScale = React.useMemo(() => (
    value.options.includes(Options.LogScale)
  ), [ value.options ]);

  React.useLayoutEffect(() => {
    const listener = () => {
      let selectedStates = fromHash();

      (!selectedStates.length) && (selectedStates = ['New York', 'Florida', 'Texas']);
      update({
        selectedStates: orderBy(
          selectedStates,
          [ state => state.toLowerCase() ],
          [ 'asc' ]
        )
      });
    };
    window.addEventListener('hashchange', listener);
    listener();
    return () => {
      window.removeEventListener('hashchange', listener);
    };
  }, []);

  return (
    <GlobalContext.Provider {...{ value: {
      ...value, update,
      includeUS, isRelative, isLogScale,
    } }} >
      { children }
    </GlobalContext.Provider>
  );
};
Provider.displayName = 'GlobalContext'

export default Provider;
