import React from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import { CovidProvider } from './data/context';

import './App.scss';

const Covid19: React.FC<any> = () => {
  const [ type, setType ] = React.useState('cases' as ('deaths' | 'cases'));
  const [ includeUS, toggleUS ] = React.useState(true);
  const [ states, setStates ] = React.useState([
    'New York',
    'Texas',
    'Florida',
    'Kentucky',
    'Tennessee',
    'California',
  ]);

  return (
    <CovidProvider>
      <main style={{ display: 'contents' }}>
        <Graph {...{ type, states, includeUS }} />
        <Menu {...{ type, setType, includeUS, toggleUS, states, setStates }}/>
      </main>
    </CovidProvider>
  );
};

export default Covid19;
