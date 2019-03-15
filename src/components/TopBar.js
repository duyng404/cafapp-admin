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
							<NavLink to="/driver" className="nav-link" activeClassName="active">Driver</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/orders" className="nav-link" activeClassName="active">Orders</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/users" className="nav-link" activeClassName="active">Users</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/redeemables" className="nav-link" activeClassName="active">Redeemables</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/system" className="nav-link" activeClassName="active">System</NavLink>
						</li>
					</ul>
				</div>
				<a className="nav-item text-muted pr-4 my-2" href={`${process.env.REACT_APP_BACKEND_URL}/dash`}>Back to main site</a>
			</nav>

		);
	}
}

export default TopBar;
