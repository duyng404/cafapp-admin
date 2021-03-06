import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from './components/TopBar';
import AuthChecker from './components/AuthChecker';
import Queue from './containers/Queue';
import Redeemables from './containers/Redeemables';
import Users from './containers/Users';
import Orders from './containers/Orders';
import System from './containers/System';
import Driver from './containers/Driver';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.authCheckOK = this.authCheckOK.bind(this);
		this.state = {
			isLoggedIn: false,
		};
	}

	authCheckOK = () => {
		this.setState({
			isLoggedIn: true,
		});

	}

  render() {
    return (
			<Router>
			{ !this.state.isLoggedIn ?
				<AuthChecker authCheckOK={this.authCheckOK} />
				:
					<>
						<TopBar />
						<div className="container-fluid">
							<Route exact path="/" component={Queue} />
							<Route path="/driver" component={Driver} />
							<Route path="/orders" component={Orders} />
							<Route path="/redeemables" component={Redeemables} />
							<Route path="/users" component={Users} />
							<Route path="/system" component={System} />
						</div>
					</>
			}
			</Router>
    );
  }
}

export default App;
