import React from 'react';
import classes from './modal.css';
import Aux from '../../../hoc/Auz';
import BackDrop from '../BackDrop/BackDrop';

const Modal = (props) => (
  <Aux>
    <BackDrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default Modal;
