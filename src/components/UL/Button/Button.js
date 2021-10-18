import React from 'react';
import classes from './Button.css';
const Button = (props) => {
  console.log(props.btnType);
  console.log(classes[props.btnType]);
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(' ')}
    >
      {props.children}
    </button>
  );
};

export default Button;