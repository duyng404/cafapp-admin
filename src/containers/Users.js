import React from 'react';
import * as api from '../utils/api';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import UserTable from '../components/UserTable';
import UserInfo from '../components/UserInfo';
class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usersData: [],
			userInfo: {},
			fullname: "",
			gususername: "",
			sortBy: "id"
		}
		this.handleViewDetailsUser = this.handleViewDetailsUser.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object
	}

	handleFormChange(e) {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	}

	handleFormSubmit(e) {
		e.preventDefault();
		
		let endPts = [];
		Object.keys(this.state).forEach((key) => {
			if (key !== "" && key !== "usersData" && key !== "userInfo") {
				endPts.push(`${key}=${this.state[key]}`);
			}
		});
		const url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users?${endPts.join("&")}`;
		this.context.router.history.push(`/users/${endPts.join("&")}`);
		api.fetchUrl(url)
			.then(res => {
				this.setState({ usersData: res.data });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleViewDetailsUser(e) {
		//get data of one particular user
		api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users/${e.target.value}`)
			.then(res => {
				res.data.userInfo.allOrders = res.data.allOrders;
				this.setState({ userInfo: res.data.userInfo })
				return
			});
	}
	componentDidMount() {
		//get all users' data
		const value = queryString.parse(this.props.location.search);
		api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users
		?fullname=${!value.fullname? "" : value.fullname}
		&gususername=${!value.gususername? "" : value.gususername}
		&sortBy=${!value.sortBy ? "" : value.sortBy}`)
			.then(res => {
				this.setState({ usersData: res.data });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">Users Management</h1>
					<div>abcxyz</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h3>Search filters</h3>
						<form onSubmit={this.handleFormSubmit}>
							<div className="form-row">
								<div className="col-4">
									<label htmlFor="filter-name">Full Name</label>
									<input onChange={this.handleFormChange} type="text" className="form-control" placeholder="eg. Jon Smith" name="fullname" id="fullname" value={this.state.fullname} />
								</div>
								<div className="col-4">
									<label htmlFor="filter-name">Gus Username</label>
									<input onChange={this.handleFormChange} type="text" className="form-control" placeholder="eg. jsmith3" name="gususername" id="gususername" value={this.state.gususername} />
								</div>
								<div className="col-4">
									<label htmlFor="filter-sort">Sort By</label>
									<select onChange={this.handleFormChange} name="sortBy" value={this.state.sortBy} className="form-control" id="filter-sort">
										<option value="id">ID ascending</option>
										<option value="idDESC">ID descending</option>
										<option value="full_name">Full Name A-Z</option>
										<option value="full_nameDESC">Full Name Z-A</option>
										<option value="gus_username">Gus Username A-Z</option>
										<option value="gus_usernameDESC">Gus Username Z-A</option>
									</select>
								</div>
							</div>
							<div className="d-flex justify-content-end mt-2">
								<button className="btn btn-primary" type="submit">Search</button>
							</div>
						</form>
					</div>
				</div>

				<div className="my-4"></div>

				<h3>Search results</h3>
				{this.state.usersData.length !== 0 ?
					<UserTable viewUserDetail={this.handleViewDetailsUser} data={this.state.usersData} />
					:
					<p className="text-muted">No results</p>
				}
				<div className="my-4"></div>
				<h3>User Details</h3>
				{Object.keys(this.state.userInfo).length !== 0 ?
					<UserInfo user={this.state.userInfo} />
					:
					<p className="text-muted">No user selected</p>
				}
			</div>
		);
	}
}

export default Users;
