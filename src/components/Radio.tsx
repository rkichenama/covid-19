import { camelize } from 'humps';
import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';

export type Props = {
  label: string,
  value?: string,
  className?: string,
  checked?: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

const Label = styled.label`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-items: stretch;
`;
const Input = styled.input`
  flex: 0;
  display: inline-block;
  align-self: stretch;
  margin: 0;
  margin-right: 1.2rem;
  padding: 0;
  height: 1rem;
  width: 0;

  &:before,
  &:after {
    position: absolute;
    left: 0;
    top: 50%;
    width: 1em;
    height: 1em;
    border: 1px solid transparent;
    transform: translateY(-50%);

    font-family: 'Material Icons Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  &:before {
    content: '';
    // background-color: transparentize(white, 0.95);
  }

  &:after {
    content: 'radio_button_unchecked';
    border-color: transparent;
    color: hsla(0, 100%, 100%, 0.15);;
  }
  &:checked:after {
    content: 'radio_button_checked';
    color: var(--success);
  }
  }
`;
const Section = styled.section`
  flex: 1;
  font-size: 1rem;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Component: React.FC<Props> = ({
  className, onChange,
  label = 'radio', checked = false,
  value = camelize(label)
}) => {
  return (
    <Label{...{
      className: `${className}`,
      title: label
    }} >
      <Input {...{
        onChange, checked,
        type: 'radio',
        'data-value': value
      }} />
      <Section>{ label }</Section>
    </Label>
  );
};

const Radio = styled(Component)`
`;

export default Radio;