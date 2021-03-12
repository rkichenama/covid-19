import React from 'react';

import './RadioBox.scss';

interface RadioBoxProps {
  className?: string,
  name?: string,
  checked?: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value?: string,
  label?: string,
}

const Factory = (type: 'radio' | 'checkbox') => (
  ({
    name, checked, onChange, label = name, value = name, className
  }) => {

    return (
      <label data-class={type} {...{ className }}>
        <input {...{ type, name, checked, onChange, value }} />
        <span>{ label }</span>
      </label>
    );
  }
) as React.FC<RadioBoxProps>;

export const RadioBox = Factory('radio');
export const CheckBox = Factory('checkbox');
