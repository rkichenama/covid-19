import React from 'react';
import Panel from './Panel';
import Radios from './Radios';
import Checkboxes from './Checkboxes';
import { Options, DataTypes, GlobalContext } from '../GlobalContext';

const Menu = () => {
  const { options, dataType, update } = React.useContext(GlobalContext);
  return (
    <>
      <Panel x={2} w={3} className='as-table one-row'>
        <Radios {...{
          options: [
            { label: 'Cases', value: DataTypes.Cases },
            { label: 'Deaths', value: DataTypes.Deaths }
          ],
          onChange: (dataType: DataTypes) => { update({ dataType }); },
          selected: dataType
        }} />
      </Panel>
      <Panel w={4} className='as-table one-row'>
        <Checkboxes {...{
          options: [
            { label: 'Relative', value: Options.Deltas },
            { label: 'Log Scale', value: Options.LogScale },
            { label: 'Include US', value: Options.ShowOverall },
          ],
          onChange: (options: Options[]) => { update({ options }); },
          selected: options
        }} />
      </Panel>
    </>
  );
};

export default Menu;
