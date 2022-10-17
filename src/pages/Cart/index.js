import { Component } from "react";
import CartItem from "../../components/Cart/CartItem";
import classes from "./Cart.module.css";

class Cart extends Component {
  render() {
    return (
      <main className={classes.cart}>
        <h1>CART</h1>
        <CartItem />
        <CartItem />
        <CartItem />
        <div className={classes.total}>
          <table>
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
          </table>
          <button>ORDER</button>
        </div>
      </main>
    );
  }
}

export default Cart;
