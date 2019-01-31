import React from 'react';
import Moment from 'moment';
import * as api from '../utils/api';

class Generate extends React.Component {
	constructor(props) {
		super(props);
		this.generateFiveCodes = this.generateFiveCodes.bind(this);
		this.state = {
			availableCodes: [],
			redeemedCodes: [],
			newCodes: [],
		};
	}

	generateFiveCodes(e) {
		e.preventDefault();
		api.postUrl("/api/admin/generate-five-codes")
		.then(response => {
			if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
				this.setState({
					newCodes: [],
				});
				return;
			}
			this.setState(prevState => ({
				newCodes: response.data,
				availableCodes: [...prevState.availableCodes, ...response.data],
			}))
		}).catch(err => {
			console.log(err);
		});
	}

	componentDidMount() {
		// fetch all the codes
		api.fetchUrl("/api/admin/view-redeemable-codes")
		.then(response => {
			if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
				this.setState({
					availableCodes: [],
					redeemedCodes: [],
				});
				return;
			}
			this.setState({
				availableCodes: response.data.filter(v => v.status === 1 || v.status === 2),
				redeemedCodes: response.data.filter(v => v.status === 3),
			})
		})
		.catch(err => {
			console.log(err);
		})
	}

	render () {
		return (
			<>
				<section className="container mt-5 text-center">
					<h2 className="font-weight-bold">Generate Redeemable Codes</h2>
					<div className="my-4"></div>
					<p className="lead">Click the button below to generate five redeemable codes. Remember to write them down afterwards.</p>
					<button className="btn btn-primary btn-lg" type="button" onClick={this.generateFiveCodes}>Generate 5 Redeemable Codes</button>
				</section>

				<section className="container mt-5 text-center">
					{ this.state.newCodes.map(code => (
						<h3 className="my-5 ca-mono-font">{code.code}</h3>
					))}
				</section>

				<hr className="my-5" />

				<section className="container text-center">
					<h2 className="font-weight-bold">Available Codes</h2>
					<table class="table table-responsive-md">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Generated</th>
								<th scope="col">Amount</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.availableCodes.map(code => (
								<tr>
									<th scope="row">{code.code}</th>
									<td>{Moment(code.created_at).format("MMM Y h:mmA")}</td>
									<td>$10</td>
									<td className="text-success">Available</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>

				<hr className="my-5" />

				<section className="container mt-5 text-center">
					<h2 className="font-weight-bold">Redeemed Codes</h2>
					<table class="table table-responsive-md">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Generated</th>
								<th scope="col">Redeemed</th>
								<th scope="col">By</th>
								<th scope="col">Amount</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.redeemedCodes.map(code => (
								<tr>
									<th scope="row">{code.code}</th>
									<td>{Moment(code.created_at).format("MMM Y h:mmA")}</td>
									<td>{Moment(code.redeemed_at).format("MMM Y h:mmA")}</td>
									<td>{code.redeemed_by_user.gus_username}</td>
									<td>$10</td>
									<td className="text-danger">Redeemed</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</>
		)
	}
}

export default Generate;
