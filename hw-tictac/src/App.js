import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "pages";
import { StatusOverlay } from "components";

function App() {

    return (
        <>
            <StatusOverlay />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
