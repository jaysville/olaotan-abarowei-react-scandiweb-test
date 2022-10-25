import { Component } from "react";
import classes from "./ProductDetails.module.css";
import parse from "html-react-parser";
import { graphql } from "@apollo/client/react/hoc";
import { withRouter } from "../../utils/helpers";
import { GET_PRODUCT_DETAILS } from "../../utils/queries";
import { connect } from "react-redux";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { largeImageSrc: "" };
  }

  handleLargeImageSrc(src) {
    console.log(this.state);
    this.setState({ largeImageSrc: src });
  }

  render() {
    const { data, currency } = this.props;
    let content;
    if (data.loading) {
      content = <p>Loading</p>;
    }
    if (!data.loading) {
      console.log(data.product);
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
            {attributes.map((attribute) => {
              return (
                <>
                  {attribute.id === "Color" && (
                    <div className={classes.colors} key="color">
                      <h2>COLOR:</h2>
                      {attribute.items.map((item, i) => {
                        return (
                          <button
                            key={i}
                            style={{
                              backgroundColor: `${item.value}`,
                              border: "none",
                            }}
                          ></button>
                        );
                      })}
                    </div>
                  )}
                  {attribute.id === "Size" && (
                    <div className={classes.size} key="size">
                      <h2>SIZE:</h2>
                      <div>
                        {attribute.items.map((item, i) => {
                          return <button key={i}>{item.value}</button>;
                        })}
                      </div>
                    </div>
                  )}
                </>
              );
            })}

            <div>
              <h2>PRICE:</h2>
              <strong>
                {currency}
                {actualPrice?.amount.toFixed(2)}
              </strong>
            </div>

            <div>
              <button className={classes.btn}>Add To Cart</button>
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

export default connect(mapStateToProps)(
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
