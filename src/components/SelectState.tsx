import React from 'react';
import Select, { OptionsType } from 'react-select';
import Modal from 'react-modal';
import UsStates from '../data/states.json';

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
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    top: '50%',
    left: '30%',
    right: '30%',
    bottom: 'auto',
    transform: 'translateY(-50%)'
  }
};

const SelectState: React.FC<any> = ({
  states = [] as string[],
  setOpen = () => {},
  setStates = () => {}
}) => {
  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setOpen(false) }
      style={customStyles}
      contentLabel='state selector'
    >
      <Select {...{
        className: 'reactSelect-container',
        classNamePrefix: 'reactSelect',
        menuPlacement: 'auto',
        value: states.map(state => ({ label: state, value: state })) as OptionsType<any>[],
        options: UsStates.map(state => ({ label: state, value: state })),
        isMulti: true,
        isClearable: false,
        onChange: (value: OptionsType<any>) => {
          if (value && Array.isArray(value)) {
            setStates(value.map(({ value }) => value));
          } else {
            setStates([]);
          }
        }
      }} />
    </Modal>
  );
};

export default SelectState;
