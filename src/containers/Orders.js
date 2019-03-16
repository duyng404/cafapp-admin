import React from 'react';
import * as api from '../utils/api';
import queryString from 'query-string';
import OrdersTable from '../components/OrdersTable';

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
		}
		// this.handleViewDetailsUser = this.handleViewDetailsUser.bind(this);
		// this.handleFormChange = this.handleFormChange.bind(this);
		// this.handleFormSubmit = this.handleFormSubmit.bind(this);
		// this.buildQueryParams = this.buildQueryParams.bind(this);

		// get all query params
		const value = queryString.parse(this.props.location.search);
		if (value.fullname && value.fullname !== "") this.state.fullname = value.fullname;
		if (value.gususername && value.gususername !== "") this.state.gususername = value.gususername;
		if (value.sortBy && value.sortBy !== "") this.state.sortBy = value.sortBy;
	}

	// // this helper function will build the query params part of the url and return it, using the state
	// buildQueryParams() {
	// 	const params = {
	// 		fullname: this.state.fullname,
	// 		gususername: this.state.gususername,
	// 		sortBy: this.state.sortBy,
	// 	};
	// 	// if param is their default value, remove it by setting it to undefined
	// 	if (params.fullname === "") params.fullname = undefined;
	// 	if (params.gususername === "") params.gususername = undefined;
	// 	if (params.sortBy === "id") params.sortBy = undefined;
	// 	return queryString.stringify(params);
	// }

	// handleFormChange(e) {
	// 	const name = e.target.name;
	// 	this.setState({ [name]: e.target.value });
	// }

	// handleFormSubmit(e) {
	// 	e.preventDefault();
	// 	const params = this.buildQueryParams();
	// 	const url = `/api/admin/view-users?${params}`;
	// 	this.props.history.push(`/users?${params}`);
	// 	api.fetchUrl(url)
	// 		.then(res => {
	// 			this.setState({ usersData: res.data });
	// 			return;
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// }

	// handleViewDetailsUser(e) {
	// 	//get data of one particular user
	// 	api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users/${e.target.value}`)
	// 		.then(res => {
	// 			res.data.userInfo.allOrders = res.data.allOrders;
	// 			this.setState({ userInfo: res.data.userInfo });
	// 			const element = document.getElementById("user-details");
	// 			element.scrollIntoView({behavior: 'smooth'});
	// 			return
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// }

	componentDidMount() {
		// do a get request
		api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders-last-12-hours`)
			.then(res => {
				console.log(res.data);
				this.setState({ orders: res.data });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="ca-container">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">Orders Management</h1>
					{/* <div>abcxyz</div> */}
				</div>
				{/* <div className="card">
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

				<div className="my-4"></div> */}

				<h3>All orders last 12 hours</h3>
				{this.state.orders.length > 0 ?
					<OrdersTable data={this.state.orders} />
					:
					<p className="text-muted">No results</p>
				}
				{/* <div className="my-4"></div>
				<h3 id="user-details">User Details</h3>
				{Object.keys(this.state.userInfo).length !== 0 ?
					<UserInfo user={this.state.userInfo} />
					:
					<p className="text-muted">No user selected</p>
				} */}
				<p className="text-muted">More features will come ...</p>
			</div>
		);
	}
}

export default Orders;
