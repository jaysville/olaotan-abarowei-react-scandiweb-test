import { Component } from "react";
import classes from "./app.module.css";
import { createPortal } from "react-dom";

const portalElement = document.getElementById("backdrop");

class Backdrop extends Component {
  render() {
    return (
      <>{createPortal(<div className={classes.backdrop} />, portalElement)}</>
    );
  }
}

export default Backdrop;
