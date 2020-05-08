import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import { createStructuredSelector} from 'reselect'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selector'

import { auth,createUserProfileDocument } from './Firebase/firebase.utils';
import {setCurrectUser} from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrectUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrectUser ({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
      }
      else{
        setCurrectUser(userAuth);
      }
    }); 
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path ='/checkout' component = {CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render = {() => this.props.currentUser ? (
            <Redirect to = '/' />) : (
            <SignInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProp = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProp = dispatch => ({
  setCurrectUser: user => dispatch(setCurrectUser(user))
});

export default  connect(mapStateToProp, mapDispatchToProp )(App);