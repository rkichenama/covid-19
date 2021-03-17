import React from 'react';
import { RadioBox } from './RadioBox';

interface RadioOptionsProps {
  type?: 'deaths' | 'cases',
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const RadioOptions: React.FC<RadioOptionsProps> = ({
  type = 'cases',
  onChange = (evt) => {
    console.table(evt.target, ['value', 'checked'])
  }
}) => {

  return (
    <fieldset className='radio-options w2 as-grid one-row'>
      {/* <label className='w6 align-center'>
        <input name={`${'radio'}-option`} type={'radio'} value={'deaths'} checked={type === 'deaths'} {...{ onChange }}
        />
        <span>Deaths</span>
      </label> */}
      <RadioBox {...{
        onChange,
        className: 'w6 align-center',
        name: 'radio-option',
        value: 'deaths',
        label: (<span className='material-icons' title='Deaths'>person_remove</span>),
        checked: type === 'deaths',
      }} />
      <RadioBox {...{
        onChange,
        className: 'w6 align-center',
        name: 'radio-option',
        value: 'cases',
        label: (<span className='material-icons' title='Cases'>medical_services</span>),
        checked: type === 'cases',
      }} />
      {/* <label className='w6 align-center'>
        <input name={`${'radio'}-option`} type={'radio'} value={'cases'} checked={type === 'cases'} {...{ onChange }}
        />
        <span>Cases</span>
      </label> */}
    </fieldset>
  );
};

export default RadioOptions;
