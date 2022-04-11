import React from 'react';
import Panel from './Panel';
import { formattedNumber, longDate } from '../data/transforms';
import { GlobalContext } from '../GlobalContext';

const Info = () => {
  const { hoverValue } = React.useContext(GlobalContext);
  return (
    <Panel x={9} w={3}>
      {
        hoverValue.date ? (
          <section style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '100%'
          }} >
            <div>{longDate(hoverValue.date)}</div>
            <div>{formattedNumber(Math.round(hoverValue.value))}</div>
          </section>
        ) : null
      }
    </Panel>
  );
};

export default Info;
