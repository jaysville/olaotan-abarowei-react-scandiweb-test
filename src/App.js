import React, { Component } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORIES } from "./utils/queries";

class App extends Component {
  constructor() {
    super();
    this.state = { activeCategory: "all" };
  }
  setActiveCategory(category) {
    this.setState({ activeCategory: category });
  }

  render() {
    const { data } = this.props;
    const categories = data.categories?.map((category) => category.name);
    return (
      <>
        <Header
          categories={categories}
          activeCategory={this.state.activeCategory}
          setActiveCategory={this.setActiveCategory.bind(this)}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProductList
                activeCategory={this.state.activeCategory}
                setActiveCategory={this.setActiveCategory.bind(this)}
              />
            }
          />
          <Route path="/item/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    );
  }
}
export default graphql(GET_CATEGORIES)(App);
