import React from 'react';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';
import Panel from './Panel';
import Radios from './Radios';
import Checkboxes from './Checkboxes';
import Canvas from './Canvas';
import USChart from './USChart';
import flatten from 'lodash/flatten';
import { useNytUSHistoryChart, useNytHistoryChartByStates } from '../hooks/diseases.sh';
import {
  differenceInMonths, differenceInDays,
  addDays, addMonths, addYears,
  startOfDay, startOfMonth, startOfYear,
  endOfMonth, endOfYear,
  isEqual,
  min as minDate,
  isWithinInterval,
} from 'date-fns';
import orderBy from 'lodash/orderBy';
import { compactNumber, formattedNumber, longDate, shortDate } from '../data/transforms';
import { GlobalContext } from '../GlobalContext';

const Highlight = styled.span`
  color: var(--highlight);
  font-weight: bold;
  margin-right: 4px;
`;
const Blurb = styled.div`
  font-size: 0.8rem;
  line-height: 1em;
`;
const BlurbDeck = styled.section`
  overflow: hidden;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(96px * 1.8);
  grid-template-rows: 1fr;
  gap 2px;
`;

const capitalize = (str: string) => (
  str.replaceAll(/\b[a-z]/g, (v) => v.toUpperCase())
);

const ImportantDates = () => {
  const { hoverValue } = React.useContext(GlobalContext);
  const dates = React.useMemo(() => (
    Object.entries(window['importantDates'])
      .map(([ day, info ]: [ string, string ]) => {
        const date = startOfDay(new Date(day));
        return {
          start: addDays(date, -5),
          end: addDays(date, 5),
          date,
          info
        };
      })
  ), [ window['importantDates'] ]);

  return (
    <BlurbDeck>
      {
        dates
          .filter(interval => (
            isWithinInterval(hoverValue.date, interval)
          ))
          .map(({ date, info }) => (
            <Blurb key={date.getTime()}>
              <Highlight>{ shortDate(date) }</Highlight>
              { capitalize(info) }
            </Blurb>
          ))
      }
    </BlurbDeck>
  )
};

export default ImportantDates;
