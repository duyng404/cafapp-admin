import React from 'react';
import * as api from '../utils/api';
import * as socket from '../utils/socket';

class AuthChecker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statusMsg: 'Checking Admin Privileges ...',
		}
	}

	 connectToQueue(token) {
		if (!token || token === '') {
			this.setState({statusMsg: "Some error happened. Pls try reloading."})
			return
		}
		socket.initSocket(token)
		.then(() => {
			this.props.authCheckOK();
		})
		.catch(() => {
			this.setState({statusMsg: "Cannot connect to the queue. Pls try reloading."})
		});

	}

	componentDidMount() {
		api.fetchUrl("/api/admin/my-info")
		.then(response => {
			this.setState({statusMsg: "Connecting to the queue ..."});
			this.connectToQueue(response.data.socket_token);
		})
		.catch(err => {
			if (err.response) {
				if (err.response.status === 401) {
					this.setState({statusMsg: "Not logged in. Redirecting to login..."});
					window.location = process.env.REACT_APP_BACKEND_URL + '/admin';
				} else if (err.response.status === 403) {
					this.setState({statusMsg: "Sorry, you are not an admin."})
				}
			} else {
				console.log("bruh")
				console.log(err)
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
