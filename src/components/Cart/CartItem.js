import { Component } from "react";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/appSlice";
import { QuantityWrapper } from "../UI/Cart/CartDropdownItem";
import { ColorButton } from "../../pages/ProductDetails";
import styled from "styled-components";

class CartItem extends Component {
  constructor() {
    super();
    this.state = { displayImage: "" };
  }

  render() {
    const { item, currency } = this.props;
    const actualPrice = item.prices.find(
      (price) => price.currency.symbol === currency
    );

    const scroll = () => {
      const choice = Math.floor(Math.random() * item.gallery.length);
      this.setState({ ...this.state, displayImage: item.gallery[choice] });
    };

    return (
      <li className={classes.item}>
        <div className={classes.container}>
          <div className={classes.first}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.brand}</p>
              <strong>
                {currency} {actualPrice.amount.toFixed(2)}
              </strong>
              {item.attributes.map((attribute, i) => {
                return (
                  <div key={i}>
                    {attribute.id === "Color" && (
                      <div className={classes.colors}>
                        <h2>COLOR:</h2>
                        {attribute.items.map((item, i) => {
                          return (
                            <ColorButton
                              key={i}
                              colorValue={item.value}
                              selected={
                                this.props.item.colorChoice === item.value
                              }
                            />
                          );
                        })}
                      </div>
                    )}
                    {attribute.id === "Size" && (
                      <div className={classes.size}>
                        <h2>SIZE:</h2>
                        <div>
                          {attribute.items.map((item, i) => {
                            return (
                              <button
                                key={i}
                                className={
                                  this.props.item.sizeChoice === item.value
                                    ? classes.sizeChoice
                                    : ""
                                }
                              >
                                {item.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.last}>
            <div className={classes.actions}>
              <button
                onClick={() => {
                  this.props.addToCart({
                    ...item,
                  });
                }}
              >
                +
              </button>
              <QuantityWrapper>{item.quantity}</QuantityWrapper>
              <button
                onClick={() => {
                  this.props.removeFromCart(item.id);
                }}
              >
                -
              </button>
            </div>
            <Carousel>
              <img
                src={this.state.displayImage || item.gallery[0]}
                alt="poster"
              />
              {item.gallery.length > 1 && (
                <div className={classes.scroll}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={scroll}
                  >
                    <rect
                      width="24"
                      height="24"
                      fill="black"
                      fillOpacity="0.73"
                    />
                    <path
                      d="M14.25 6.06857L8.625 11.6876L14.25 17.3066"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={scroll}
                  >
                    <rect
                      width="24"
                      height="24"
                      transform="matrix(-1 0 0 1 24 0)"
                      fill="black"
                      fillOpacity="0.73"
                    />
                    <path
                      d="M9.75 6.06808L15.375 11.6871L9.75 17.3062"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(null, mapDispatchToProps)(CartItem);

const Carousel = styled.div`
  position: relative;
`;
