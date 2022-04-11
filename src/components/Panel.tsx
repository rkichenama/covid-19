import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';

export type Props = {
  x?: number,
  y?: number,
  w?: number,
  h?: number,
  className?: string,
  children?: any,
  style?: any,
  noBg?: boolean
};

const Panel: React.FC<Props> = ({
  className, children, x, y, w = 1, h = 1
}) =>{
  return (
    <section {...{
      children,
      className: `${
        x ? `x${x} ` : ''
      }${
        y ? `y${y} ` : ''
      }w${w} h${h} panel ${className}`
    }} />
  );
};

const Pane = styled(Panel)`
  background-color: ${props => (
    props.noBg ? 'transparent' : 'hsla(0, 0%, 0%, 0.6)'
  )};

  & & {
    margin: 2px;
    padding: 0 2px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  ${props => props.style}
`;

export default Pane;
