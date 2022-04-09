import React from 'react';
import Panel from './components/Panel';
import ChartLayers from './components/CanvasLayers';
import Menu from './components/Menu';
import Info from './components/Info';
import Status from './components/Status';

import './App.scss';

const App = () => {
  return (
    <>
      <Panel x={1} y={1} w={12} noBg className='as-table one-row'>
        <Menu />
        <Info />
      </Panel>
      <Panel x={1} y={2} w={12} h={10} noBg style={{ position: 'relative' }} >
        <ChartLayers />
      </Panel>
      <Status x={1} y={12} w={12} />
    </>
  )
};

export default App;