import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from './components/TopBar';
import AuthChecker from './components/AuthChecker';
import Queue from './containers/Queue';
import Generate from './containers/Generate';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
		};
	}

	authCheckOK = () => {
		this.setState({isLoggedIn: true});
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
							<Route path="/orders" component={Orders} />
							<Route path="/generate" component={Generate} />
						</div>
					</>
			}
			</Router>
    );
  }
}

function Orders() {
  return (
    <div>
      <h2>Orders</h2>
    </div>
  );
}

export default App;
