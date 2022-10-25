import { Component } from "react";
import classes from "./ProductItem.module.css";
import { ProductCartBtn } from "../UI/svgs";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = { inCart: false };
  }
  handleCartItem(id, data, isInCart) {
    if (!isInCart) {
      this.props.addToCart(data);
      this.setState({ inCart: !this.state.inCart });
    } else {
      this.props.removeFromCart(id);
    }
  }

  render() {
    const { product, currency, cartItemIds } = this.props;
    const { id, name, brand, gallery, prices } = product;

    const actualPrice = prices.find(
      (price) => price.currency.symbol === currency
    );
    if (cartItemIds.includes(id)) {
      this.setState({ ...this.state, inCart: true });
    }

    return (
      <li className={classes.item}>
        <img src={gallery[0]} alt="item" />

        <span
          className={`${classes.btn} ${this.state.inCart && classes.show}`}
          onClick={() => {
            this.handleCartItem(
              id,
              {
                ...product,
                id: product.id,
                quantity: 1,
                selected: {},
              },
              cartItemIds.includes(product.id)
            );
          }}
        >
          <Link to="#">{ProductCartBtn}</Link>
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
