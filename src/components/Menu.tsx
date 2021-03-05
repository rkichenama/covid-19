import React from 'react';
import RadioOptions from './RadioOptions';
import SelectState from './SelectState';
import CovidContext from '../data/context';
import { Actions } from '../data/reducer';

const Menu: React.FC<any> = () => {
  const {
    dispatch,
    type, includeUS, logScale, states, deltas
  } = React.useContext(CovidContext);
  const [ isOpen, setOpen ] = React.useState(false);

  return (
    <div className='x1 y1 w12 h1 as-grid one-row'>
      <RadioOptions {...{
        type: type, onChange: (evt: any) => dispatch({ type: Actions.changeType, payload: evt?.target?.value || 'deaths' })
      }} />
      <fieldset className='w4 as-table'>
        <label className='w4'>
          <input type='checkbox'
            checked={deltas}
            onChange={(evt: any) => dispatch({ type: Actions.toggleDeltas, payload: !deltas })}
          />
          Show Deltas
        </label>
        <label className='w4'>
          <input type='checkbox'
            checked={includeUS}
            onChange={(evt: any) => dispatch({ type: Actions.includeUS, payload: !includeUS })}
          />
          Include US
        </label>
        <label className='w4'>
          <input type='checkbox'
            checked={logScale}
            onChange={(evt: any) => dispatch({ type: Actions.toggleScale, payload: !logScale })}
          />
          Log Scale
        </label>
      </fieldset>
      <div className='w2'>
        <button onClick={() => setOpen(true)}>select states</button>
        {
          isOpen ? (
            <SelectState {...{ states, setOpen, setStates: a => {
              console.log(a)
              dispatch({ type: Actions.upStates, payload: a })
            } }}/>
          ) : null
        }
      </div>
    </div>
  );
};

export default Menu;
