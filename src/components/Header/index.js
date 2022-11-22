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
import styled from "styled-components";

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

  render() {
    const {
      categories,
      activeCategory,
      setActiveCategory,
      currency,
      changeCurrency,
      totalQuantity,
    } = this.props;

    return (
      <header className={classes.header}>
        <nav className={classes.nav}>
          <ul className={classes.categories}>
            {categories?.map((category, i) => {
              return (
                <Link
                  key={i}
                  to={`/${i === 0 ? "" : category}`}
                  className={classes.navlink}
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

          <IconsContainer>
            <div className={classes.icons}>
              <CurrencyContainer
                onClick={this.toggleCurrencyDropdown.bind(this)}
              >
                <strong>
                  {currency}
                  {"   "}
                  {this.state.showCurrencyDropdown
                    ? CurrencyArrowUp
                    : CurrencyArrowDown}
                </strong>
              </CurrencyContainer>
              <div onClick={this.toggleCartDropDown.bind(this)}>
                <span className={classes.cart}>{EmptyCart}</span>
                <Badge>{totalQuantity}</Badge>
              </div>
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
          </IconsContainer>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency,
    cartCount: state.app.cartCount,
    totalQuantity: state.app.totalQuantity,
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

const IconsContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const CurrencyContainer = styled.span`
  margin-right: 1em;
`;

const Badge = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  bottom: 15px;
  right: -10px;
`;
