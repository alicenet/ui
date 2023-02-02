import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style/index.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "alice-mui-provider";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);