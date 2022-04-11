import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';
import Radio from './Radio';

export type Props = {
  options: Array<{
    label: string,
    value: string
  }>,
  selected?: string,
  onChange?: Function
}

const Radios: React.FC<Props> = ({ options, selected, onChange = () => {} }) => {
  // const [ selected, setSelected ] = React.useState(current.value);

  return (
    <>
      { options.map(({ label, value }) => (
        <Radio key={value} {...{
          label, value,
          className: `w${ Math.max(1, Math.floor(12 / options.length)) }`,
          checked: selected === value,
          onChange: ({ target }) => {
            onChange(target.dataset['value']);
          }
        }} />
      )) }
    </>
  );
};

export default styled(Radios)`
`;;