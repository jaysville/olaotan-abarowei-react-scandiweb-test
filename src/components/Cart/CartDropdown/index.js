import { Component } from "react";
import Backdrop from "../../UI/Backdrop";
import CartDropdownItem from "../../UI/Cart/CartDropdownItem";
import classes from "./CartDropdown.module.css";

class CartDropdown extends Component {
  render() {
    return (
      <>
        <Backdrop />
        <div className={classes.dropdown}>
          <p style={{ marginLeft: "1em" }}>
            <b>My Bag</b> , <em>3 items</em>
          </p>
          <ul>
            <CartDropdownItem />
            <CartDropdownItem /> <CartDropdownItem /> <CartDropdownItem />{" "}
            <CartDropdownItem />
          </ul>
          <div>
            <div className={classes.amount}>
              <h5>Total Amount</h5>
              <h5>$500.00</h5>
            </div>
            <div className={classes.actions}>
              <button>View Bag</button>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartDropdown;
