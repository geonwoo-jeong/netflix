/* tslint:disable */

require("dotenv").config();

/* eslint-disable import/first */
import App from "./Components/App";
import React from "react";
import ReactDOM from "react-dom";

// import * as serviceWorker from "serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
