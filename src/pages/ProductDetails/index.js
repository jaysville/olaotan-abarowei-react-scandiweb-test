import { Component } from "react";
import classes from "./ProductDetails.module.css";
import parse from "html-react-parser";
import { graphql } from "@apollo/client/react/hoc";
import { withRouter } from "../../utils/helpers";
import { GET_PRODUCT_DETAILS } from "../../utils/queries";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/appSlice";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { largeImageSrc: "", colorChoice: "", sizeChoice: "" };
  }

  handleLargeImageSrc(src) {
    this.setState({ ...this.state, largeImageSrc: src });
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
    if (data.loading) {
      content = <p>Loading</p>;
    }
    if (!data.loading) {
      const { name, brand, attributes, description, prices } = data.product;
      const actualPrice = prices.find(
        (price) => price.currency.symbol === currency
      );

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
                          <button
                            key={i}
                            style={{
                              backgroundColor: `${item.value}`,
                            }}
                            onClick={this.updateColor.bind(this, item.value)}
                            className={
                              this.state.colorChoice === item.value
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
                className={classes.btn}
                onClick={() => {
                  this.props.addToCart({
                    ...data?.product,
                    quantity: 1,
                    sizeChoice: this.state.sizeChoice || "",
                    colorChoice: this.state.colorChoice || "",
                  });
                  alert("Added To Cart");
                }}
              >
                Add To Cart
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
