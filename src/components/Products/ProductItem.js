import { Component } from "react";
import classes from "./ProductItem.module.css";
import { ProductCartBtn } from "../UI/svgs";
import { connect } from "react-redux";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = { showButton: false };
  }

  showButtonHandler() {
    this.setState({ showButton: true });
  }
  hideButtonHandler() {
    this.setState({ showButton: false });
  }

  render() {
    const { product, currency, cartItemIds } = this.props;
    const { id, name, brand, gallery, prices } = product;

    const actualPrice = prices.find(
      (price) => price.currency.symbol === currency
    );

    return (
      <li
        className={classes.item}
        onMouseEnter={this.showButtonHandler.bind(this)}
        onMouseLeave={this.hideButtonHandler.bind(this)}
      >
        <img src={gallery[0]} alt="item" />

        <span
          className={`${classes.btn} ${this.state.showButton && classes.show}`}
        >
          {ProductCartBtn}
        </span>
        <p>
          {brand} {name}
        </p>
        <strong>
          {currency} {actualPrice?.amount.toFixed(2).toLocaleString()}
        </strong>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItemIds: state.app.cartItemIds,
  };
};

export default connect(mapStateToProps)(ProductItem);
