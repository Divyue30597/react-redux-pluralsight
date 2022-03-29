import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/Home";
import AboutPage from "./about/About";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="container-fluid">
    {/* React Router will watch the URL and then render the relevant route based on the path properties that we've declared here on line 11 and 12. So if the URL is empty, our homepage will display. And if the URL contains /about, then our About page will display. */}
    <Header />
    {/* To handle 404s, import a second component from react‑router‑dom, which is called Switch. Switch allows us to declare that only one route should match. What we can do is wrap our route declarations in Switch. And now, as soon as one of these routes matches, it will stop looking for other matching routes. So Switch operates a lot like a switch statement in JavaScript. */}
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
