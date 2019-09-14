import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AllPostComponent from './AllPostComponent/AllPostComponent';
import CommentsComponent from './CommentsComponent/CommentsComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="DevelopsToday/"
          render={() => <AllPostComponent />}
        />
        <Route
          path="DevelopsToday/posts/:id"
          render={() => <CommentsComponent />}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
