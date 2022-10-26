import { Component } from "react";
import classes from "./ProductItem.module.css";
import { ProductCartBtn } from "../UI/svgs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = { showButton: false, addedToCart: false };
  }

  showButtonHandler() {
    this.setState({ ...this.state, showButton: true });
  }
  hideButtonHandler() {
    this.setState({ ...this.state, showButton: false });
  }

  cartItemHandler(id, data, inCart) {
    if (inCart) {
      this.props.removeFromCart(id);
      this.setState({ ...this.state, addedToCart: false });
    } else {
      this.props.addToCart(data);
      this.setState({ ...this.state, addedToCart: true });
    }
  }

  render() {
    const { product, currency, cartItemIds } = this.props;
    const { id, name, brand, gallery, prices } = product;

    const actualPrice = prices.find(
      (price) => price.currency.symbol === currency
    );

    return (
      <li
        className={`${classes.item} ${this.state.addedToCart && classes.added}`}
        onMouseEnter={this.showButtonHandler.bind(this)}
        onMouseLeave={this.hideButtonHandler.bind(this)}
      >
        <img src={gallery[0]} alt="item" />
        <object>
          <Link to="#">
            <span
              onClick={() => {
                this.cartItemHandler(
                  id,
                  {
                    ...product,
                    quantity: 1,
                    selected: {},
                  },
                  cartItemIds.includes(id)
                );
              }}
              className={`${classes.btn} ${
                this.state.showButton && classes.show
              }`}
            >
              {ProductCartBtn}
            </span>
          </Link>
        </object>

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

export default ProductItem;
