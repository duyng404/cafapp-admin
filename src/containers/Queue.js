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
		this.state = {
			q: [],
		}
	}

	extractData(filter) {
		switch (filter) {
			case "queue":
				return this.state.q.filter(v =>
					v.status_code === types.OrderStatusQueued ||
					v.status_code === types.OrderStatusRequeued ||
					v.status_code === types.OrderStatusPlaced);
			default:
				return [];
		}
	}

	commitQueue(q) {
		socket.commitQueue(q)
		.then(() => {

		})
		.catch(() => {

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
		const { q } = this.state;
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
