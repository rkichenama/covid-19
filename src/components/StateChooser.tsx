import React from 'react';
import orderBy from 'lodash/orderBy';
import styled from 'styled-components';
import {} from 'styled-components/cssprop';
import Panel from './Panel';
import AvailableStates from '../data/states.json';
import { StateColors } from '../hooks/diseases.sh';
import Checkbox from './Checkbox';
import { GlobalContext } from '../GlobalContext';

const Button = styled.button`
  width: unset;
`;
const ModalBg = styled(Panel)`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled(Panel)`
  position: relative;
  border-radius: 0.75rem;
  padding: 1.5rem !important;
  background-color: #131313;
  box-shadow: 2px 2px 4px #333333;
  display: grid;
  grid-auto-columns: max-content;
  grid-template-rows: repeat(10, 1fr);
  grid-auto-flow: column;
  gap: 4px;
`;
const C: React.FC<{ className?: string, onClick: React.MouseEventHandler }> = ({ className, onClick }) => (
  <div {...{ className, onClick }} >
    <span className='material-icons' style={{
      verticalAlign:'middle', fontSize: '1em'
    }}>close</span>
  </div>
);
const fauxShadow = `
  text-shadow:
    calc(var(--stroke-width, 1px) * 1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * 1) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * -1) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),
    calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000);
`;
const Close = styled(C)`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 60;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--error);
  cursor: pointer;

  &:hover {
    background-color: var(--error);
    color: white;
  }

  .material-icons {
    ${fauxShadow}
  }
`;
type Props = {
  className?: string
}

const Component: React.FC<Props> = ({ className }) => {
  const { selectedStates } = React.useContext(GlobalContext);
  const [ displayModal, setDisplayModal ] = React.useState(false);
  return (
    <>
      <Button onClick={() => { setDisplayModal(show => !show); }}>
        <span className='material-icons-outlined'>where_to_vote</span>{' '}
        Choose States
      </Button>
      {
        displayModal ? (
          <ModalBg>
            <Modal>
              <Close onClick={() => { setDisplayModal(false); }} />
              {
                AvailableStates.map(state => (
                  <Checkbox key={state} {...{
                    style: StateColors[state] ? { color: StateColors[state] } : undefined,
                    label: state, value: state,
                    checked: selectedStates.includes(state),
                    onChange: () => {
                      let newSelectedStates = [ ...selectedStates ];
                      if (newSelectedStates.includes(state)) {
                        newSelectedStates = newSelectedStates.filter(item => item !== state);
                      } else {
                        newSelectedStates = [...newSelectedStates, state ];
                      }
                      window.location.hash = `#${
                        orderBy(
                          newSelectedStates,
                          [ state => state.toLowerCase() ],
                          [ 'asc' ]
                        )
                          .join(',')
                      }`;
                    }
                  }} />
                ))
              }
            </Modal>
          </ModalBg>
        ) : null
      }
    </>
  );
};

const StateChooser = styled(Component)``;

export default StateChooser;