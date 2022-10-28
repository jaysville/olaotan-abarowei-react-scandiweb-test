import { Component } from "react";
import Backdrop from "../../UI/Backdrop";
import CartDropdownItem from "../../UI/Cart/CartDropdownItem";
import classes from "./CartDropdown.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartDropdown extends Component {
  render() {
    const { toggleCartDropDown, cartItems, currency, totalQuantity } =
      this.props;
    let total = 0;
    this.props.cartItems.map(({ quantity, prices }) => {
      let price = prices.find(
        (price) => price.currency.symbol === this.props.currency
      );
      return (total += price.amount * quantity);
    });
    return (
      <>
        <Backdrop onClick={toggleCartDropDown} />
        <div className={classes.dropdown}>
          <p style={{ marginLeft: "1em" }}>
            <b>My Bag</b> , <em>{totalQuantity} item(s)</em>
          </p>
          <ul>
            {cartItems.map((item, i) => {
              return (
                <CartDropdownItem item={item} key={i} currency={currency} />
              );
            })}
          </ul>
          <div>
            <div className={classes.amount}>
              <h5>Total Amount</h5>
              <h5>
                {currency} {total.toFixed(2)}
              </h5>
            </div>
            <div className={classes.actions}>
              <Link
                to="/cart"
                style={{ textDecoration: "none" }}
                onClick={toggleCartDropDown}
              >
                <button>View Bag</button>
              </Link>

              <button>Checkout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.app.cart,
    currency: state.app.currency,
    totalQuantity: state.app.totalQuantity,
  };
};

export default connect(mapStateToProps)(CartDropdown);
