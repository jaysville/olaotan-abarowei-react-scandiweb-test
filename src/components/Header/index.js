import { Component } from "react";
import CartDropdown from "../Cart/CartDropdown";
import {
  EmptyCart,
  GreenBag,
  CurrencyArrowDown,
  CurrencyArrowUp,
} from "../UI/svgs";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/slices/appSlice";
import { GET_CURRENCIES } from "../../utils/queries";
import { graphql } from "@apollo/client/react/hoc";

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
  }

  toggleCartDropDown() {
    this.setState({
      showCurrencyDropdown: false,
      showCartDropdown: !this.state.showCartDropdown,
    });
  }

  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    const {
      categories,
      activeCategory,
      setActiveCategory,
      currency,
      changeCurrency,
    } = this.props;

    return (
      <header>
        <nav className={classes.nav}>
          <ul className={classes.categories}>
            {categories?.map((category, i) => {
              return (
                <Link
                  key={i}
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    setActiveCategory(category);
                  }}
                >
                  <li
                    className={
                      activeCategory === category ? classes.activeCategory : ""
                    }
                  >
                    {category.toUpperCase()}
                  </li>
                </Link>
              );
            })}
          </ul>
          <span className={classes.bag}>{GreenBag}</span>
          <div style={{ display: "flex" }}>
            <div className={classes.icons}>
              <span
                onClick={this.toggleCurrencyDropdown.bind(this)}
                style={{ marginRight: "1em" }}
              >
                <strong>
                  {currency}
                  {"   "}
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
                {!this.props.data.loading &&
                  this.props.data?.currencies?.map((currency, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          changeCurrency(currency.symbol);
                          this.setState({
                            ...this.state,
                            showCurrencyDropdown: false,
                          });
                        }}
                        className={
                          this.props.currency === currency.symbol
                            ? classes.activeCurrency
                            : ""
                        }
                      >
                        {currency.symbol} {currency.label}
                      </li>
                    );
                  })}
              </ul>
            )}
            {this.state.showCartDropdown && (
              <CartDropdown
                toggleCartDropDown={this.toggleCartDropDown.bind(this)}
              />
            )}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency,
    cartCount: state.app.cartCount,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (symbol) => {
      dispatch(changeCurrency(symbol));
    },
  };
};

export default graphql(GET_CURRENCIES)(
  connect(mapStateToProps, matchDispatchToProps)(Header)
);
