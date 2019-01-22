import React from 'react';
import * as api from '../utils/api';

class AuthChecker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statusMsg: 'Checking Admin Privileges ...',
		}
	}

	componentDidMount() {
		api.fetchUrl("/api/admin-info")
		.then(response => {
			this.props.authCheckOK();
		})
		.catch(err => {
			if (err.response.status && err.response.status === 401) {
				console.log(err.response);
				this.setState({statusMsg: "Check failed. Redirecting to login..."});
				window.location = process.env.REACT_APP_BACKEND_URL + '/admin';
			}
		})
	}

	render() {
		return (
			<h2 className="mt-4">{this.state.statusMsg}</h2>
		)
	}
}

export default AuthChecker;
