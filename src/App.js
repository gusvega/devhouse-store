import React, { Component } from 'react';
import './App.css';

import HomePage from './pages/homepages/homepage.component';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth } from './firebase/firebase.utils';

class App extends Component {

	constructor(){
		super()

		this.state = {
			currentUser: null
		}
	}

	componentDidMount(){
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({currentUser: user})
			console.log(user)
		})
	}

	componentWillUnmount(){
		this.unsubscribeFromAuth()
	}

	unsubscribeFromAuth= null

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser}/>
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
