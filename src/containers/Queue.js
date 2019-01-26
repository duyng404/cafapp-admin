import React from 'react';
import QueueList from '../components/QueueList';
import * as api from '../utils/api';
import * as types from '../types';

class Queue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			q: {
				queued: [],
				prepping: [],
				shipping: [],
				delivered: [],
			}
		}
	}

	extractData(data) {
		if (!data || !Array.isArray(data) || data.length === 0) {
			return
		}
		console.log(data);
		const queued = data.filter(v =>
			v.status_code === types.OrderStatusQueued ||
			v.status_code === types.OrderStatusRequeued ||
			v.status_code === types.OrderStatusPlaced);
		const prepping = data.filter(v =>
			v.status_code === types.OrderStatusPrepping);
		const shipping = data.filter(v =>
			v.status_code === types.OrderStatusShipping);
		const delivered = data.filter(v =>
			v.status_code === types.OrderStatusDelivered);
		this.setState({
			q: { queued, prepping, shipping, delivered, }
		})
	}

	componentDidMount() {
		// fetch the current queue
		api.fetchUrl("/api/admin/view-queue")
		.then(response => {
			this.extractData(response.data);
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		const { queued, prepping, shipping, delivered } = this.state.q;
		return (
			<div className="container-fluid mt-5">
				<h2 className="text-center">Queue</h2>

				<div className="row">
					<div className="col-12 col-xl-6">
						<QueueList
							data={queued}
							name="queued"
						/>
					</div>
					<div className="col-12 col-xl-6">
						{/* <FlipMove>
							<div className="card" key="order0">cardd</div>
							<div className="alert alert-primary" key="order1">one</div>
							<div className="alert alert-primary" key="order2">two</div>
							<div className="alert alert-primary" key="order3">three</div>
						</FlipMove> */}
					</div>
				</div>

			</div>
		)
	}
}

export default Queue;
