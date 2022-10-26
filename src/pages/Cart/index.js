import { Component } from "react";
import CartItem from "../../components/Cart/CartItem";
import classes from "./Cart.module.css";
import { connect } from "react-redux";

class Cart extends Component {
  render() {
    return (
      <main className={classes.cart}>
        <h1>CART</h1>
        {this.props.cartItems.map((item, i) => {
          return <CartItem item={item} key={i} />;
        })}
        <div className={classes.total}>
          <table>
            <tbody>
              <tr>
                <td>Tax: 21%:</td>
                <td>$42.00</td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>$200.00</td>
              </tr>
            </tbody>
          </table>
          <button>ORDER</button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.app.cart,
  };
};

export default connect(mapStateToProps)(Cart);
