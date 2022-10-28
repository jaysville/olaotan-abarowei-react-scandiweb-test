import { Component } from "react";
import classes from "./app.module.css";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/appSlice";

class CartDropdownItem extends Component {
  render() {
    const { item, currency } = this.props;
    const actualPrice = item.prices.find(
      (price) => price.currency.symbol === currency
    );
    return (
      <li className={classes.item}>
        <div className={classes.first}>
          <strong>{item.name}</strong>
          <p>{item.brand}</p>
          <strong>
            {currency} {actualPrice.amount.toFixed(2)}
          </strong>
          {item.attributes.map((attribute, i) => {
            return (
              <div key={i}>
                {attribute.id === "Color" && (
                  <div className={classes.color}>
                    <h2>COLOR:</h2>
                    {attribute.items.map((item, i) => {
                      return (
                        <button
                          key={i}
                          style={{
                            backgroundColor: `${item.value}`,
                          }}
                          className={
                            this.props.item.colorChoice === item.value
                              ? classes.colorChoice
                              : ""
                          }
                        ></button>
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
            <span style={{ textAlign: "center", fontWeight: 500 }}>
              {item.quantity}
            </span>
            <button
              onClick={() => {
                this.props.removeFromCart(item.id);
              }}
            >
              -
            </button>
          </div>
          <img src={item.gallery[0]} alt="poster" />
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
export default connect(null, mapDispatchToProps)(CartDropdownItem);
