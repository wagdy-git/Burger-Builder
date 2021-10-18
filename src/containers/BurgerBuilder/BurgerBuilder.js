import React, { Component } from 'react';
import Aux from '../../hoc/Auz';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls/BuildControls';
import Modal from '../../components/UL/modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UL/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
  salad: 1.2,
  bacon: 2.2,
  cheese: 3.2,
  meat: 3.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalprice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get(
        'https://react-my-burger-899ac-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchasesState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 ? true : false });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert('you continue!');'

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalprice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  addIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    const updatedCounter = oldCounter + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCounter;
    const oldPrice = this.state.totalprice;
    const priceAddition = INGREDIENT_PRICE[type];
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalprice: newPrice, ingredients: updatedIngredient });
    this.updatePurchasesState(updatedIngredient);
  };

  removIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    if (oldCounter <= 0) return;

    let updatedCounter = oldCounter - 1;
    const updatedIngredient = { ...this.state.ingredients };
    const oldPrice = this.state.totalprice;
    const priceDeduction = INGREDIENT_PRICE[type];
    const newPrice = oldPrice - priceDeduction;

    updatedIngredient[type] = updatedCounter;
    this.setState({ totalprice: newPrice, ingredients: updatedIngredient });
    this.updatePurchasesState(updatedIngredient);
  };
  render() {
    let orderSummary = null;

    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? <p>this app is brocken</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdd={this.addIngredientHandler}
            ingredientrRemove={this.removIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalprice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalprice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
