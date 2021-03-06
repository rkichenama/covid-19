import React from 'react';
import RadioOptions from './RadioOptions';
import { CheckBox } from './RadioBox';
import SelectState from './SelectState';
import CovidContext from '../data/context';
import { Actions } from '../data/reducer';
import Vaccines from './Vaccines';

import './Menu.scss';

const Menu: React.FC<any> = () => {
  const {
    dispatch,
    type, includeUS, logScale, states, deltas
  } = React.useContext(CovidContext);
  const [ isOpen, setOpen ] = React.useState(false);
  const [ showVaccines, toggleVaccines ] = React.useState(false);

  return (
    <div id='one-menu' className='x1 y1 w12 h1 as-grid one-row'>
      <RadioOptions {...{
        type: type, onChange: (evt: any) => dispatch({ type: Actions.changeType, payload: evt?.target?.value || 'deaths' })
      }} />
      <fieldset className='w4 as-grid one-row'>
        <CheckBox {...{
          className: 'w4 align-center',
          checked: deltas,
          label: (<span className='material-icons' title='Show Deltas'>compare</span>),
          onChange: (evt: any) => dispatch({ type: Actions.toggleDeltas, payload: !deltas })
        }} />
        {/* <label className='w4'>
          <input type='checkbox'
            checked={deltas}
            onChange={(evt: any) => dispatch({ type: Actions.toggleDeltas, payload: !deltas })}
          />
          Show Deltas
        </label> */}
        <CheckBox {...{
          className: 'w4 align-center',
          checked: includeUS,
          label: (<span className='material-icons' title='Include US'>plus_one</span>),
          onChange: (evt: any) => dispatch({ type: Actions.includeUS, payload: !includeUS })
        }} />
        {/* <label className='w4'>
          <input type='checkbox'
            checked={includeUS}
            onChange={(evt: any) => dispatch({ type: Actions.includeUS, payload: !includeUS })}
          />
          Include US
        </label> */}
        <CheckBox {...{
          className: 'w4 align-center',
          checked: logScale,
          label: (<span className='material-icons' title='Log Scale'>search</span>),
          onChange: (evt: any) => dispatch({ type: Actions.toggleScale, payload: !logScale })
        }} />
        {/* <label className='w4'>
          <input type='checkbox'
            checked={logScale}
            onChange={(evt: any) => dispatch({ type: Actions.toggleScale, payload: !logScale })}
          />
          Log Scale
        </label> */}
      </fieldset>
      <div className='w3 as-table'>
        <button className='w6' onClick={() => setOpen(true)}>select states</button>
        {
          isOpen ? (
            <SelectState {...{ states, setOpen, setStates: a => {
              dispatch({ type: Actions.upStates, payload: a })
            } }}/>
          ) : null
        }
        <button className='x9 w3' onClick={() => toggleVaccines(true)}>go</button>
      </div>
      <div id='portal' className='x10 w3'></div>
      {
        showVaccines ? (
          <Vaccines isOpen={showVaccines} setOpen={toggleVaccines} />
        ) : null
      }
    </div>
  );
};

export default Menu;
