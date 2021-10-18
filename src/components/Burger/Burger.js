import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => (
      <BurgerIngredient key={i} type={igKey} />
    ));
  });
  const reducedArray = transformedIngredients.reduce((acc, current) => {
    return acc.concat(current);
  }, []);

  if (reducedArray.length === 0) {
    transformedIngredients = <p>please Choose ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
