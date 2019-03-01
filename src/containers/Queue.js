import React from 'react';
import QueueList from '../components/QueueList';
import * as api from '../utils/api';
import * as socket from '../utils/socket';
import * as types from '../types';

class Queue extends React.Component {
	constructor(props) {
		super(props);
		this.extractData = this.extractData.bind(this);
		this.setQueueStatus = this.setQueueStatus.bind(this);
		this.commitQueue = this.commitQueue.bind(this);
		this.commitPrep = this.commitPrep.bind(this);
		this.commitShip = this.commitShip.bind(this);
		this.updateQueue = this.updateQueue.bind(this);
		this.onNewOrder = this.onNewOrder.bind(this);
		this.state = {
			q: [],
			queueStatus: 'connecting',
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
			case "approach":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusApproaching);
			case "delivered":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusDelivered);
			default:
				return [];
		}
	}

	// render the queue status
	renderQueueStatus() {
		const { queueStatus } = this.state;
		switch (queueStatus) {
			case 'connecting':
				return <span className="text-info">Connecting to server...</span>;
			case 'connected':
				return <span className="text-secondary">Connected</span>;
			case 'connect_error':
				return <span className="text-danger">Unable to connect</span>;
			case 'server_error':
				return <span className="text-danger">Unable to connect: server error</span>;
			case 'connect_timeout':
				return <span className="text-danger">Unable to connect: timed out</span>;
			case 'reconnecting':
				return <span className="text-info">Reconnecting...</span>;
			case 'disconnected':
				return <span className="text-danger">Disconnected</span>;
			default:
				return <span className="text-warning">{queueStatus}</span>;
		}
	}

	setQueueStatus(status) {
		this.setState({queueStatus: status});
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
		socket.commitQueue(q);
	}

	commitPrep(q) {
		console.log("committing prep:", q);
		socket.commitPrep(q);
	}

	commitShip(q) {
		console.log("committing ship:", q);
		socket.commitShip(q);
	}

	commitApproach(q) {
		console.log("committing approach:", q);
		socket.commitApproach(q);
	}

	onNewOrder(order) {
		this.setState(prevState => ({q: [...prevState.q, order]}))
	}

	componentDidMount() {
		// fetch the current queue
		api.fetchUrl("/api/admin/view-queue")
		.then(response => {
			if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
				this.setState({q:[]});
				return;
			}
			this.setState({q : response.data});
		})
		.catch(err => {
			console.log(err);
		})

		// set socket event handlers
		socket.onConnect(this.setQueueStatus);
		socket.onConnectError(this.setQueueStatus);
		socket.onDisconnect(this.setQueueStatus);
		socket.onReconnectAttempt(this.setQueueStatus);

		// when we receive new order
		socket.onNewOrder(this.onNewOrder)
		// when the queue changes and we need to update
		socket.onQueueUpdate(this.updateQueue)

		// connect to the socket
		socket.initSocket()
	}


	render() {
		return (
			<div className="mt-5">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2">Queue Management</h1>
					<div>{this.renderQueueStatus()}</div>
				</div>

				<div className="row">
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("queue")}
							name="Placed"
							commitAction={this.commitQueue}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("prep")}
							name="Prepping"
							commitAction={this.commitPrep}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("ship")}
							name="Out for delivery"
							commitAction={this.commitShip}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("approach")}
							name="Approaching"
							commitAction={this.commitApproach}
						/>
					</div>
					<div className="col-12 col-xl-6 mt-4">
						<QueueList
							data={this.extractData("delivered")}
							name="Delivered"
						/>
					</div>
				</div>

				<div className="my-5"></div>

			</div>
		)
	}
}

export default Queue;
