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
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMainContent" aria-controls="navbarMainContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse in" id="navbarMainContent">
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
					</ul>
				</div>
				<a className="nav-link text-danger" href="http://localhost:7000/logout">Logout</a>
			</nav>

			// <nav className="navbar navbar-expand-sm navbar-dark bg-ca-dark">
			// 	<a className="navbar-brand" href="/">
			// 		<img src={process.env.PUBLIC_URL + '/favicon.png'} width="30" height="30" className="d-inline-block align-top" alt="" />
			// 		<span className="ca-logo-text text-ca-yellow1"><strong>&nbsp;CafApp Admin</strong></span>
			// 	</a>
			// 	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMainContent" aria-controls="navbarMainContent" aria-expanded="false" aria-label="Toggle navigation">
			// 		<span className="navbar-toggler-icon"></span>
			// 	</button>

			// 	<div className="collapse navbar-collapse in" id="navbarMainContent">
			// 		<ul className="navbar-nav mr-auto">
			// 			<li className="nav-item">
			// 				<a className="nav-link" href="/queue">Queue</a>
			// 			</li>
			// 			<li className="nav-item">
			// 				<a className="nav-link" href="/orders">Orders</a>
			// 			</li>
			// 			<li className="nav-item">
			// 				<a className="nav-link" href="/users">Users</a>
			// 			</li>
			// 			<li className="nav-item">
			// 				<a className="nav-link text-ca-yellow2" href="/order">Order Now!</a>
			// 			</li>
			// 		</ul>
			// 	</div>
			// </nav>
		);
	}
}

export default TopBar;
