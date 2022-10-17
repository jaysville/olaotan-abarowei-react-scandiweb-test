import { Component } from "react";
import CartDropdown from "../Cart/CartDropdown";
import {
  EmptyCart,
  GreenBag,
  CurrencyArrowDown,
  CurrencyArrowUp,
} from "../UI/svgs";
import classes from "./Header.module.css";

class Header extends Component {
  constructor() {
    super();
    this.state = { showCurrencyDropdown: false, showCartDropdown: false };
  }

  toggleCurrencyDropdown() {
    this.setState({
      showCartDropdown: false,
      showCurrencyDropdown: !this.state.showCurrencyDropdown,
    });
    console.log(this.state);
  }

  toggleCartDropDown() {
    this.setState({
      showCurrencyDropdown: false,
      showCartDropdown: !this.state.showCartDropdown,
    });
  }
  render() {
    return (
      <header>
        <nav className={classes.nav}>
          <ul className={classes.categories}>
            <li>WOMEN</li>
            <li>MEN</li>
            <li>KIDS</li>
          </ul>
          <span className={classes.bag}>{GreenBag}</span>
          <div style={{ display: "flex" }}>
            <div className={classes.icons}>
              <span
                onClick={this.toggleCurrencyDropdown.bind(this)}
                style={{ marginRight: "1em" }}
              >
                <strong>
                  ${" "}
                  {this.state.showCurrencyDropdown
                    ? CurrencyArrowUp
                    : CurrencyArrowDown}
                </strong>
              </span>
              <span
                className={classes.cart}
                onClick={this.toggleCartDropDown.bind(this)}
              >
                {EmptyCart}
              </span>
            </div>

            {this.state.showCurrencyDropdown && (
              <ul className={classes["currency-dropdown"]}>
                <li>$ USD</li>
                <li>&euro; EUR </li>
                <li>&yen; JPY</li>
              </ul>
            )}
            {this.state.showCartDropdown && <CartDropdown />}
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
