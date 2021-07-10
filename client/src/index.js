import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";

import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
