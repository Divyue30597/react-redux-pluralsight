import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

// It can be useful to pass initial state into the store here if we are working on the server rendering or initializing the redux store with data from the local storage.

// You might be confused about the difference between passing initial state here and setting the initial state within our reducer??? Now currently, our reducer sets the initial state using a default parameter in the reducer. So passing initial state here is merely for overriding the default parameters that we specify in our reducers.

const store = configureStore();

render(
  // Now our app will be able to access our Redux store because our entire app is being wrapped in the Provider component.
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById("app")
);
