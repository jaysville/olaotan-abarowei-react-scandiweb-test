import { Component } from "react";
import classes from "./CartItem.module.css";
import dummy from "../../assets/dummy.png";

class CartItem extends Component {
  render() {
    return (
      <li className={classes.item}>
        <div className={classes.container}>
          <div className={classes.first}>
            <strong>Apollo</strong>
            <p>Running Short</p>
            <strong>$ 50.00</strong>
            <div className={classes.size}>
              <h2>SIZE:</h2>
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
            </div>
            <div className={classes.color}>
              <h2>COLOR:</h2>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>
          <div className={classes.last}>
            <div className={classes.actions}>
              <button>+</button>
              <span style={{ textAlign: "center", fontWeight: 500 }}>1</span>
              <button>-</button>
            </div>

            <img src={dummy} alt="poster" />
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
