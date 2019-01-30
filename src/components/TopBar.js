import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class TopBar extends React.Component{
	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<Link className="navbar-brand" to="/">
					<img src={process.env.PUBLIC_URL + '/favicon.png'} width="30" height="30" className="d-inline-block align-top" alt="" />
					<span className="ca-logo-text text-ca-yellow4"><strong>&nbsp;CafApp Admin</strong></span>
				</Link>

				<div className="navbar-collapse" id="navbarMainContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink exact to="/" className="nav-link" activeClassName="active">Queue</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/orders" className="nav-link" activeClassName="active">Orders</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/users" className="nav-link" activeClassName="active">Users</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/generate" className="nav-link" activeClassName="active">Generate</NavLink>
						</li>
					</ul>
				</div>
				<a className="nav-item text-danger pr-4" href={`${process.env.REACT_APP_BACKEND_URL}/logout`}>Logout</a>
			</nav>

		);
	}
}

export default TopBar;
