import { Component } from "react";
import classes from "./ProductDetails.module.css";
import parse from "html-react-parser";
import { graphql } from "@apollo/client/react/hoc";
import { withRouter } from "../../utils/helpers";
import { GET_PRODUCT_DETAILS } from "../../utils/queries";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/appSlice";
import styled from "styled-components";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      largeImageSrc: "",
      colorChoice: "",
      sizeChoice: "",
      hasAttributes: false,
    };
  }

  handleLargeImageSrc(src) {
    this.setState({ ...this.state, largeImageSrc: src });
  }

  cartItemHandler(data, hasAttributes) {
    if (!hasAttributes) {
      this.props.addToCart(data);
      alert("Added To Cart");
    } else if (
      hasAttributes &&
      (this.state.colorChoice !== "" || this.state.sizeChoice !== "")
    ) {
      this.props.addToCart(data);
      alert("Added To Cart");
    } else {
      alert("Please select attributes (size or color)");
    }
  }

  updateColor(color) {
    this.setState({ ...this.state, colorChoice: color });
  }
  updateSize(size) {
    this.setState({ ...this.state, sizeChoice: size });
  }
  render() {
    const { data, currency } = this.props;

    let content;
    let hasAttributes;

    if (data.loading) {
      content = <p>Loading</p>;
    }
    if (!data.loading) {
      const { name, brand, attributes, description, prices, inStock } =
        data.product;
      const actualPrice = prices.find(
        (price) => price.currency.symbol === currency
      );

      const colorAttr = attributes?.find(
        (attribute) => attribute.id === "Color"
      );
      const sizeAttr = attributes?.find((attribute) => attribute.id === "Size");

      if (colorAttr || sizeAttr) {
        hasAttributes = true;
      } else {
        hasAttributes = false;
      }

      content = (
        <div className={classes.container}>
          <div className={classes.images}>
            <div className={classes["sm-img-container"]}>
              {this.props.data?.product?.gallery?.map((src, i) => {
                return (
                  <img
                    key={i}
                    src={src}
                    alt="poster"
                    className={`${classes["small-img"]} ${
                      this.state.largeImageSrc === src
                        ? classes.activeImage
                        : ""
                    }`}
                    onClick={this.handleLargeImageSrc.bind(this, src)}
                  />
                );
              })}
            </div>
            <div>
              <img
                src={this.state.largeImageSrc || data?.product?.gallery[0]}
                alt=""
                className={classes["lg-img"]}
              />
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.title}>
              <h1>{name}</h1>
              <h5>{brand}</h5>
            </div>

            {attributes.map((attribute, i) => {
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
                            onClick={this.updateColor.bind(this, item.value)}
                            selected={this.state.colorChoice === item.value}
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
                              onClick={this.updateSize.bind(this, item.value)}
                              className={
                                this.state.sizeChoice === item.value
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

            <div>
              <h2>PRICE:</h2>
              <strong>
                {currency} {actualPrice?.amount.toFixed(2)}
              </strong>
            </div>
            <div>
              <button
                className={`${classes.btn} ${
                  !inStock && classes["out-of-stock"]
                }`}
                disabled={!inStock}
                onClick={() => {
                  this.cartItemHandler(
                    {
                      ...data?.product,
                      id:
                        data?.product.id +
                        (this.state.colorChoice || this.state.sizeChoice),
                      quantity: 1,
                      sizeChoice: this.state.sizeChoice,
                      colorChoice: this.state.colorChoice,
                    },
                    hasAttributes
                  );
                }}
              >
                {inStock ? "Add To Cart" : "Out Of Stock"}
              </button>
            </div>
            <article>{parse(description)}</article>
          </div>
        </div>
      );
    }
    return <>{content}</>;
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.app.currency,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(
  withRouter(
    graphql(GET_PRODUCT_DETAILS, {
      options: (props) => ({
        variables: {
          product_id: props.router.params.id,
        },
      }),
    })(ProductDetails)
  )
);

export const ColorButton = styled.button`
  background-color: ${(props) => props.colorValue};
  border: ${(props) =>
    props.selected ? " 3px solid #5ece7b" : "1px solid black"};
`;
