import { Component } from "react";
import classes from "./ProductItem.module.css";
import dummy from "../../assets/dummy.png";
import { ProductCartBtn } from "../UI/svgs";

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
    return (
      <li
        className={classes.item}
        onMouseEnter={this.showButtonHandler.bind(this)}
        onMouseLeave={this.hideButtonHandler.bind(this)}
      >
        <img src={dummy} alt="item" />
        <span
          className={`${classes.btn} ${this.state.showButton && classes.show}`}
        >
          {ProductCartBtn}
        </span>
        <p>Apollo Running Short</p>
        <strong>$50.00</strong>
      </li>
    );
  }
}
export default ProductItem;
