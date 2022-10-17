import { Component } from "react";
import classes from "./ProductDetails.module.css";
import DummyProducts from "../../dummy-products";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { largeImageSrc: null };
  }

  handleLargeImageSrc(src) {
    this.setState({ largeImageSrc: src });
    console.log(this.state);
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.images}>
          <div>
            {DummyProducts.map(({ src }, i) => {
              return (
                <img
                  key={i}
                  src={src}
                  alt="poster"
                  className={classes["small-img"]}
                  onClick={this.handleLargeImageSrc.bind(this, src)}
                />
              );
            })}
          </div>
          <div>
            <img
              src={this.state.largeImageSrc}
              alt=""
              className={classes["lg-img"]}
            />
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.title}>
            <h1>Apollo</h1>
            <h5>Running Short</h5>
          </div>
          <div className={classes.size}>
            <h2>SIZE</h2>
            <div>
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
            </div>
          </div>
          <div className={classes.colors}>
            <h2>COLOR</h2>
            <button></button>
            <button></button>
            <button></button>
          </div>
          <div>
            <h2>PRICE</h2>
            <strong>$50.00</strong>
          </div>

          <div>
            <button className={classes.btn}>Add To Cart</button>
          </div>
          <article>
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </article>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
