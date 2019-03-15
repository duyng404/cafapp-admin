import React from 'react';
import * as api from '../utils/api';

class System extends React.Component {
	constructor(props) {
		super(props);
		this.switchOnOff = this.switchOnOff.bind(this);
		this.switchMenu = this.switchMenu.bind(this);
		this.state = {
			status: false,
			fetching: true,
			active_menu_id: 0,
			menus: [],
			fetchingmenu: true,
		}
	}

	componentDidMount() {
		api.fetchUrl("/api/admin/cafapp-onoff")
			.then(res => {
				this.setState({ status: res.data.status, fetching: false });
				return;
			})
			.catch(err => {
				console.log(err);
			});

		api.fetchUrl("/api/admin/menu-status")
			.then(res => {
				this.setState({ active_menu_id: res.data.active_menu_id, menus: res.data.menus, fetchingmenu: false });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}

	switchOnOff() {
		let target = 'on';
		if (this.state.status) target = 'off';
		this.setState({ fetching: true });
		api.postUrl("/api/admin/cafapp-onoff", {set_to: target})
			.then(res => {
				this.setState({ status: res.data.status, fetching: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	switchMenu() {
		this.setState({ fetchingmenu: true });
		api.postUrl("/api/admin/menu-status", {set_to: 0})
			.then(res => {
				this.setState({ active_menu_id: res.data.active_menu_id, menus: res.data.menus, fetchingmenu: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="ca-container">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">System Settings</h1>
					{/* <div>abcxyz</div> */}
				</div>

				<h3>Turn CafApp On/Off</h3>
				{ this.state.fetching ? <p>Loading...</p> :
					<>
						<p>CafApp is currently {this.state.status ? 'Running' : 'Not Running'}.</p>
						<button className="btn btn-primary" onClick={this.switchOnOff}>Turn {this.state.status ? 'Off' : 'On'}</button>
					</>
				}

				<hr className="my-4"></hr>

				<h3>Switch menu</h3>
				{ this.state.fetchingmenu ? <p>Loading...</p> :
					this.state.menus.map(v => (
						v.id === this.state.active_menu_id ?
						<>
							<p>Current Active Menu is: {v.display_name}</p>
							<button className="btn btn-primary" onClick={this.switchMenu}>Switch Menu</button>
						</>
						: null
					))
				}

			</div>
		)
	}
}

export default System;
