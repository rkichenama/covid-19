import { camelizeKeys } from 'humps';
import React from 'react';
import orderBy from 'lodash/orderBy';
import { usePromise } from '../hooks/promise';
import Modal from 'react-modal';
import { StateColor } from '../hooks/diseases.sh';

const customStyles = {
  overlay: {
    // position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    // position: 'absolute',
    border: '1px solid #131313',
    background: '#333',
    overflow: 'visible',
    // WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
    inset: '4vh 8vw',
  }
};

type CDCData = {
  stateCode: string,
  percentAdultsFully: string,
  percentHispanic: string,
  percentNonHispanicAmerican: string,
  percentNonHispanicAsian: string,
  percentNonHispanicBlack: string,
  percentNonHispanicNative: string,
  percentNonHispanicWhite: string,
};
type VaccineData = {
  name: string,
  percentAdultsFully: string,
  percentHispanic: number,
  percentNonHispanicAmerican: number,
  percentNonHispanicAsian: number,
  percentNonHispanicBlack: number,
  percentNonHispanicNative: number,
  percentNonHispanicWhite: number,
}
type VaccinesProps = {
  isOpen?: boolean,
  isLoading?: boolean,
  setOpen? (open: boolean): void,
  promise?: Promise<VaccineData[]>
};
const thePromise = async () => {
  const response = await fetch('https://data.cdc.gov/resource/q9mh-h2tw.json?$limit=5000&$$app_token=22fCsLaigljZeYWXX1D6ffzlf');
  const sample = camelizeKeys(await response.json());
  const intermeniate = sample
    .reduce((t, c: any) => {
      let current = t[c.stateCode] || {
        countyCount: [ 0, '' ],
        percentAdultsFully: 0,
        // for demographic purposes
        percentHispanic: 0,
        percentNonHispanicAmerican: 0,
        percentNonHispanicAsian: 0,
        percentNonHispanicBlack: 0,
        percentNonHispanicNative: 0,
        percentNonHispanicWhite: 0,
      };

      Object.keys(current).forEach(k => {
        if (!/countyCount/.test(k)) {
          current[k] += Number(c[k] || '0');
        } else {
          const [ counties, state ] = current[k];
          current[k] = [ counties + 1, c.state ];
        }
      });

      t[c.stateCode] = current;

      return t;
    }, {} as any);
  return orderBy(Object.entries<any>(intermeniate)
    .map(([ _, { countyCount: [ counties, name ], ...data } ]) => {
      return Object.keys(data).reduce((t, c) => {
        t[c] = data[c] / counties;
        return t as VaccineData;
      }, { name });
    }), [ 'name' ], [ 'asc' ]) as VaccineData[];
}


const Chart = ({ data }) => {
  const vertical = 96;
  const horizontal = ('DISTRICT OF COLUMBIA'.length * 8 * 1.15);
  const [ dataMin, dataMax ] = ((ns) => ([
    Math.min.apply(null, ns),
    Math.max.apply(null, ns)
  ]))(data
    .map(({ percentAdultsFully }) => percentAdultsFully));

  return (
    <div className='as-grid' style={{
      height: '100%',
      gridTemplateColumns: `${vertical}px 1fr`
    }} >
      <div className='h12 as-table' style={{
        gridTemplateRows: `repeat(10, 1fr) ${horizontal}px`,
      }} >
        { Array.from({ length: 10 }).map((_, idx) => (
          <div key={`t-${10 - idx}`} className='w12' style={{
            border: '1px solid white',
            borderWidth: '1px 0px',
            marginBottom: '-1px'
          }} />
        )) }
      </div>
      <div className='h12 as-table' style={{
        gridTemplateRows: `1fr ${horizontal}px`,
        gridTemplateColumns: `repeat(${data.length}, 1fr)`
      }} >
        { data.map(({ name, percentAdultsFully }) => (
          <React.Fragment key={`l-${name}`}>
            <div className='y1' style={{
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 2px'
            }}>
              <div title={`${name} ${(percentAdultsFully * 100).toFixed(2)}%`} style={{
                backgroundColor: StateColor(name),
                width: '100%',
                height: `${percentAdultsFully * 100}%`}} />
            </div>
            <div className='y2' title={name} style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '8px',
              padding: '0 2px',
              whiteSpace: 'nowrap',
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              color: percentAdultsFully === dataMin
                ? 'red'
                : percentAdultsFully === dataMax
                  ? 'green'
                  : 'currentColor'
            }}>{name}</div>
          </React.Fragment>
        )) }
      </div>
    </div>
  );
};
const V: React.FC<VaccinesProps> = ({ promise, isOpen = false, setOpen = () => {}}) => {
  const { isLoading, data } = usePromise<VaccineData[]>(promise);

  return (
    // @ts-ignore
    <Modal {...{
      isOpen,
      onRequestClose () { setOpen(false) },
      style: customStyles,
      contentLabel: 'vaccine chart'
    }} >
      {
        isLoading
        ? (
          <div className='loading' style={{ width: '100%', height: '100%' }} />
          )
          : (<Chart {...{ data }} />)
        }
    </Modal>
  );
};

const Vaccines: React.FC<VaccinesProps> = (props) => {
  const [ promise ] = React.useState(thePromise());

  return (
    <V {...props} {...{ promise }} />
  );
};

export default Vaccines;
