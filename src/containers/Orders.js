import React from 'react';
import * as api from '../utils/api';
import queryString from 'query-string';
import OrdersTable from '../components/OrdersTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			currentDate: null,
		}
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		// this.handleViewDetailsUser = this.handleViewDetailsUser.bind(this);
		// this.handleFormChange = this.handleFormChange.bind(this);
		// this.handleFormSubmit = this.handleFormSubmit.bind(this);
		// this.buildQueryParams = this.buildQueryParams.bind(this);

		// get all query params
		const value = queryString.parse(this.props.location.search);
		if (value.date && value.date !== "") {
			// check legit date in iso8601 format
			const dateraw = moment(value.date);
			if (dateraw.toString() !== "Invalid date") {
				this.state.dateRaw = dateraw.toDate();
			}
		}
	}

	// this helper function will build the query params part of the url and return it, using the state
	buildQueryParams() {
		const params = {
			date: moment(this.state.currentDate).toISOString(true),
		};
		// if param is their default value, remove it by setting it to undefined
		if (this.state.currentDate === null) params.date = undefined;
		return queryString.stringify(params);
	}

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

	fetchData() {
		const params = this.buildQueryParams();
		const url = `/api/admin/view-orders?${params}`;
		console.log(url);
		this.props.history.push(`/orders?${params}`);
		api.fetchUrl(url)
			.then(res => {
				console.log(res.data);
				this.setState({ orders: res.data });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleDatePickerChange(date) {
		this.setState({ currentDate: date }, this.fetchData);
		// console.log("changing date to:", date);
		// console.log(moment(date).utc().toISOString());
	}

	componentDidMount() {
		// do a get request
		this.fetchData()
	}

	render() {
		return (
			<div className="ca-container">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">Orders Management</h1>
					<div>
						<span>Select a date: </span>
						<DatePicker
							className="d-inline-block form-control"
							selected={this.state.currentDate}
							onChange={this.handleDatePickerChange}
							todayButton={"Today"}
							isClearable={true}
							placeholderText="not selected"
							popperModifiers={{
								preventOverflow: {
								  enabled: true,
								  escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
								  boundariesElement: 'viewport'
								}
							  }}/>
					</div>
				</div>

				<h4 className="my-4 text-center">Currently showing: {this.state.currentDate === null ? 'All orders last 24 hours' : `All orders on ${moment(this.state.currentDate).format("MMM D")}`}</h4>
				{this.state.orders.length > 0 ?
					<OrdersTable data={this.state.orders} />
					:
					<p className="text-muted">No results</p>
				}

			</div>
		);
	}
}

export default Orders;
