import React from 'react';
import * as api from '../utils/api';

class System extends React.Component {
	constructor(props) {
		super(props);
		this.switchOnOff = this.switchOnOff.bind(this);
		this.switchMenu = this.switchMenu.bind(this);
		this.onAnnouncementChange = this.onAnnouncementChange.bind(this);
		this.setAnnouncement = this.setAnnouncement.bind(this);
		this.state = {
			status: false,
			announcement: '',
			tempAnnouncement: '',
			fetching: true,
			active_menu_id: 0,
			menus: [],
			fetchingmenu: true,
		}
	}

	componentDidMount() {
		api.fetchUrl("/api/admin/cafapp-onoff")
			.then(res => {
				this.setState({
					status: res.data.status,
					announcement: res.data.announcement,
					tempAnnouncement: res.data.announcement,
					fetching: false });
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
				this.setState({ status:
					res.data.status,
					announcement: res.data.announcement,
					tempAnnouncement: res.data.announcement,
					fetching: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	onAnnouncementChange(e) {
		this.setState({ tempAnnouncement: e.target.value });
	}

	setAnnouncement() {
		this.setState({ fetching: true });
		api.postUrl("/api/admin/set-announcement", {set_to: this.state.tempAnnouncement})
			.then(res => {
				this.setState({ status:
					res.data.status,
					announcement: res.data.announcement,
					tempAnnouncement: res.data.announcement,
					fetching: false });
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

				<h3>Set/Unset announcement</h3>
				<p className="text-muted">Leaving blank will disable it from showing</p>
				{ this.state.fetching ? <p>Loading...</p> :
					<>
						<p>Current announcement: {this.state.announcement}</p>
						<div class="input-group" style={{maxWidth: '700px'}}>
							<input type="text" class="form-control" onChange={this.onAnnouncementChange} value={this.state.tempAnnouncement} />
							<div class="input-group-append">
								<button className="btn btn-primary" onClick={this.setAnnouncement}>Save</button>
							</div>
						</div>
						<p>Preview announcement:</p>
						<div class="alert alert-primary ml-auto mr-auto spotlight-announcement" role="alert" style={{maxWidth: '700px'}}>
							<i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;
							{this.state.tempAnnouncement}
						</div>
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
