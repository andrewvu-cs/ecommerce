import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/Homepage/Homepage.component";
import ShopPage from "./pages/Shop/Shop.component";
import CheckoutPage from "./pages/Checkout/Checkout.component";
import SignInAndSignUp from "./pages/SignInSignUp/SignInSignUp.component";

import Header from "./components/Header/Header.component";

import {
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  // OBSERVER PATTERN
  // Subscriber, Persistence user sessions, oAuth for 3rd party
  componentDidMount() {
    const { setCurrentUser } = this.props;

    // listener or observer, function below is our 'next function, can set an error or complete.  
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // checks if the user is signing in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Document Snapshot object
        // Subscribe to see if our data is changing
        userRef.onSnapshot(snapShot => {
          // snapshot.data() gives us detailed info on the db
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });

  }

  

  // closes subscription, if not, memory leaks will occur
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

// accesses the store to see our value and gives us back the value
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// we import the action
const mapDispatchToProps = dispatch => ({
  //dispatch is a way for redux, whatever action youre sending it.. it will pass to every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
