import React from 'react';

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
    <fieldset className='w2 as-table'>
      <label className='w6 align-center'>
        <input name={`${'radio'}-option`} type={'radio'} value={'deaths'} checked={type === 'deaths'} {...{ onChange }}
        />
        <span>Deaths</span>
      </label>
      <label className='w6 align-center'>
        <input name={`${'radio'}-option`} type={'radio'} value={'cases'} checked={type === 'cases'} {...{ onChange }}
        />
        <span>Cases</span>
      </label>
    </fieldset>
  );
};

export default RadioOptions;
