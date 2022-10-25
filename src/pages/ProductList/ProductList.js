import { Component } from "react";
import ProductItem from "../../components/Products/ProductItem";
import classes from "./ProductList.module.css";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS } from "../../utils/queries";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../redux/slices/appSlice";

class ProductList extends Component {
  render() {
    const { data, currency, addToCart, cartItemIds } = this.props;

    const { category } = data;

    return (
      <main className={classes.container}>
        <h3>{category?.name.toUpperCase()}</h3>
        <ul className={classes.list}>
          {category?.products?.map((product) => {
            return (
              <Link key={product.id} to={`/item/${product.id}`}>
                <ProductItem
                  product={product}
                  currency={currency}
                  addToCart={addToCart}
                  cartItemIds={cartItemIds}
                />
              </Link>
            );
          })}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency,
    cartItemIds: state.app.cartItemIds,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(
  graphql(GET_PRODUCTS, {
    options: (props) => ({
      variables: {
        input: { title: props.activeCategory },
      },
    }),
  })(ProductList)
);
