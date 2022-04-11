import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';
import Checkbox from './Checkbox';

export type Props = {
  options: Array<{
    label: string,
    value: string
  }>,
  selected?: string[],
  onChange?: Function
}

const Checkboxes: React.FC<Props> = ({ options, selected = [], onChange = () => {} }) => {
  // const [ selected, setSelected ] = React.useState([]);

  return (
    <>
      { options.map(({ label, value }) => (
        <Checkbox key={value} {...{
          label, value,
          className: `w${ Math.max(1, Math.floor(12 / options.length)) }`,
          checked: selected.includes(value),
          onChange: ({ target }) => {
            if (selected.includes(value)) {
              onChange(selected.filter(item => item !== value));
            } else {
              onChange([...selected, value ]);
            }
          }
        }} />
      )) }
    </>
  );
};

export default styled(Checkboxes)`
`;;