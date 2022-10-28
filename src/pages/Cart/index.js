import { Component } from "react";
import CartItem from "../../components/Cart/CartItem";
import classes from "./Cart.module.css";
import { connect } from "react-redux";

class Cart extends Component {
  render() {
    let total = 0;
    this.props.cartItems.map(({ quantity, prices }) => {
      let price = prices.find(
        (price) => price.currency.symbol === this.props.currency
      );
      return (total += price.amount * quantity);
    });
    return (
      <main className={classes.cart}>
        <h1>CART</h1>
        {this.props.cartItems.map((item, i) => {
          return (
            <CartItem item={item} currency={this.props.currency} key={i} />
          );
        })}
        <div className={classes.total}>
          <table>
            <tbody>
              <tr>
                <td>Tax: </td>
                <td>
                  {this.props.currency} {(total * 0.21).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td>{this.props.totalQuantity}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>
                  {this.props.currency} {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              alert("Hello Scandiweb");
            }}
          >
            ORDER
          </button>
        </div>
      </main>
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

export default connect(mapStateToProps)(Cart);
