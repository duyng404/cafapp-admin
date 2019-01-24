import React from 'react';
import FlipMove from 'react-flip-move';

class Queue extends React.Component {
	render() {
		return (
			<div className="container-fluid mt-5">
				<h2 className="text-center">Queue</h2>

				<div className="row">
					<div className="col-12 col-xl-6">
						<FlipMove>
							<div className="card" key="order0">cardd</div>
							<div className="alert alert-primary" key="order1">one</div>
							<div className="alert alert-primary" key="order2">two</div>
							<div className="alert alert-primary" key="order3">three</div>
						</FlipMove>
					</div>
					<div className="col-12 col-xl-6">
						<FlipMove>
							<div className="card" key="order0">cardd</div>
							<div className="alert alert-primary" key="order1">one</div>
							<div className="alert alert-primary" key="order2">two</div>
							<div className="alert alert-primary" key="order3">three</div>
						</FlipMove>
					</div>
				</div>

			</div>
		)
	}
}

export default Queue;
