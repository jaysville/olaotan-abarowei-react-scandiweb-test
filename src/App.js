import React, { Component } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" exact element={<ProductList />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    );
  }
}
export default App;
