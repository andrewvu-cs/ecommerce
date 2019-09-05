import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/Homepage/Homepage.component";
import ShopPage from "./pages/Shop/Shop.component";
import Header from "./components/Header/Header.component";
import SignInAndSignUp from "./pages/SignInSignUp/SignInSignUp.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  state = {
    currentUser: null
  };

  unsubscribeFromAuth = null;

  // Subscriber, Persistence user sessions, oAuth for 3rd party
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // checks if the user is signing in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Document Snapshot object
        // Subscribe to see if our data is changing
        userRef.onSnapshot(snapShot => {
          // snapshot.data() gives us detailed info on the db
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  // closes subscription, if not, memory leaks will occur
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
