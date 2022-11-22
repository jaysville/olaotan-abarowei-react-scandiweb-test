import { Component } from "react";
import ProductItem from "../../components/Products/ProductItem";
import classes from "./ProductList.module.css";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS } from "../../utils/queries";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/appSlice";

class ProductList extends Component {
  componentDidMount() {
    this.props.setActiveCategory(this.props.categoryName);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName) {
      this.props.setActiveCategory(this.props.categoryName);
    }
  }
  render() {
    const { data, currency, addToCart, removeFromCart, cartItemIds } =
      this.props;
    const { category } = data;

    return (
      <main className={classes.container}>
        <h3>{`${category?.name.slice(0, 1).toUpperCase()}${category?.name.slice(
          1
        )}`}</h3>
        <ul className={classes.list}>
          {category?.products?.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                currency={currency}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cartItemIds={cartItemIds}
              />
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
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(
  graphql(GET_PRODUCTS, {
    options: (props) => ({
      variables: {
        input: { title: props.categoryName },
      },
    }),
  })(ProductList)
);
