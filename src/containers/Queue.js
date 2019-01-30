import React from 'react';
import QueueList from '../components/QueueList';
import * as api from '../utils/api';
import * as socket from '../utils/socket';
import * as types from '../types';

class Queue extends React.Component {
	constructor(props) {
		super(props);
		this.extractData = this.extractData.bind(this);
		this.commitQueue = this.commitQueue.bind(this);
		this.updateQueue = this.updateQueue.bind(this);
		this.state = {
			q: [],
		}
	}

	// filter out the orders for queue, prep, shipping and delivered to pass into the components
	extractData(filter) {
		switch (filter) {
			case "queue":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusQueued ||
					v.status_code === types.OrderStatusRequeued ||
					v.status_code === types.OrderStatusPlaced);
			case "prep":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusPrepping);
			case "ship":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusShipping);
			case "delivered":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusDelivered);
			default:
				return [];
		}
	}

	// go through the list of new orders, and update the state
	updateQueue(newOrders) {
		if (newOrders === undefined || !Array.isArray(newOrders) || newOrders.length === 0) return;
		let q = [...this.state.q];
		for (let order of newOrders) {
			q = q.map(oldorder => {
				if (order.id === oldorder.id) {
					return order;
				} else {
					return oldorder;
				}
			});
		}
		this.setState({q});
	}

	// move orders from "queued" to "prepping"
	commitQueue(q) {
		console.log("committing queue:", q);
		socket.commitQueue(q)
		.then((response) => {
			console.log("queue commit success!");
			this.updateQueue(response);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	componentDidMount() {
		// fetch the current queue
		api.fetchUrl("/api/admin/view-queue")
		.then(response => {
			this.extractData(response.data);
			if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
				this.setState({q:[]});
				return;
			}
			this.setState({q : response.data});
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		return (
			<div className="container-fluid mt-5">
				<h2 className="text-center">Queue</h2>

				<div className="row">
					<div className="col-12 col-xl-6">
						<QueueList
							data={this.extractData("queue")}
							name="queued"
							commitAction={this.commitQueue}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("prep")}
							name="prepping"
							commitAction={console.log}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("ship")}
							name="shipping"
							commitAction={console.log}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("delivered")}
							name="delivered"
						/>
					</div>
				</div>

			</div>
		)
	}
}

export default Queue;
