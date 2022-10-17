import { Component } from "react";
import ProductItem from "../../components/Products/ProductItem";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  render() {
    return (
      <main className={classes.container}>
        <h3>Category Name</h3>
        <ul className={classes.list}>
          <ProductItem /> <ProductItem /> <ProductItem /> <ProductItem />{" "}
          <ProductItem /> <ProductItem /> <ProductItem /> <ProductItem />{" "}
          <ProductItem /> <ProductItem /> <ProductItem /> <ProductItem />
        </ul>
      </main>
    );
  }
}

export default ProductList;
