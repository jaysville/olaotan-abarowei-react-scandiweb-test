import { Component } from "react";
import classes from "./ProductItem.module.css";
import { ProductCartBtn } from "../UI/svgs";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  constructor() {
    super();
    this.state = {
      showButton: false,
      addedToCart: false,
    };
  }

  showButtonHandler() {
    this.setState({ ...this.state, showButton: true });
  }
  hideButtonHandler() {
    this.setState({ ...this.state, showButton: false });
  }

  cartItemHandler(id, data, inCart) {
    if (inCart) {
      this.props.removeFromCart(id);
      this.setState({ ...this.state, addedToCart: false });
      alert("Removed From Cart");
    } else {
      this.props.addToCart(data);
      this.setState({ ...this.state, addedToCart: true });
      alert("Added To Cart");
    }
  }

  render() {
    const { product, currency, cartItemIds } = this.props;
    const { id, name, brand, gallery, prices, inStock, attributes } = product;

    const actualPrice = prices.find(
      (price) => price.currency.symbol === currency
    );

    let firstColor = "";
    let firstSize = "";
    let firstUSBChoice = "";

    if (attributes?.find((attribute) => attribute.id === "Color")) {
      firstColor = attributes?.find((attribute) => attribute.id === "Color")
        .items[0]?.value;
    }
    if (attributes?.find((attribute) => attribute.id === "Size")) {
      firstSize = attributes?.find((attribute) => attribute.id === "Size")
        .items[0]?.value;
    }
    if (attributes?.find((attribute) => attribute.id === "With USB 3 ports")) {
      firstUSBChoice = attributes?.find(
        (attribute) => attribute.id === "With USB 3 ports"
      ).items[0]?.value;
    }

    return (
      <Link key={product.id} to={`/item/${id}`}>
        <li
          className={`${classes.item} ${
            this.state.addedToCart && classes.added
          } ${!inStock && classes["out-of-stock"]}`}
          onMouseEnter={this.showButtonHandler.bind(this)}
          onMouseLeave={this.hideButtonHandler.bind(this)}
        >
          <img src={gallery[0]} alt="item" />
          {!inStock && (
            <div className={classes.fade}>
              <p>OUT OF STOCK</p>
            </div>
          )}
          <object>
            <Link to="#">
              <span
                onClick={() => {
                  inStock
                    ? this.cartItemHandler(
                        id + firstColor + firstSize,
                        {
                          ...product,
                          id: id + firstColor + firstSize + firstUSBChoice,
                          quantity: 1,
                          colorChoice: firstColor,
                          sizeChoice: firstSize,
                          usbChoice: firstUSBChoice,
                        },
                        cartItemIds.includes(
                          id + firstColor + firstSize + firstUSBChoice
                        )
                      )
                    : alert("Unavailable");
                }}
                className={`${classes.btn} ${
                  this.state.showButton && classes.show
                }`}
              >
                {ProductCartBtn}
              </span>
            </Link>
          </object>

          <p>
            {brand} {name}
          </p>
          <strong>
            {currency} {actualPrice?.amount.toFixed(2).toLocaleString()}
          </strong>
        </li>
      </Link>
    );
  }
}

export default ProductItem;
