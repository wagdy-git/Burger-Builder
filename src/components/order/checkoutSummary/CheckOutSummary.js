import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UL/Button/Button';
import classes from './CheckOutSummary.css';

const CheckoutSummary = (porps) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1> we hope it tastes well!</h1>
      <div style={{ width: '100%    ', margin: 'auto' }}>
        <Burger ingredients={porps.ingredients} />
      </div>
      <Button btnType="Danger" clicked={porps.CheckoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={porps.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
