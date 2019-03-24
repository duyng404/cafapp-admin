import React from 'react';
import Moment from 'moment';
import Accounting from 'accounting';
import * as api from '../utils/api';

class Generate extends React.Component {
	constructor(props) {
		super(props);
		this.generateCodes = this.generateCodes.bind(this);
		this.amountRef = React.createRef();
		this.reasonRef = React.createRef();
		this.valueRef = React.createRef();
		this.state = {
			inputError: "",
			availableCodes: [],
			redeemedCodes: [],
			newCodes: [],
		};
	}

	generateCodes(e) {
		e.preventDefault();
		this.setState({ inputError: "" });

		const amount = parseInt(this.amountRef.current.value, 10);
		const value = parseInt(this.valueRef.current.value, 10);
		const reason = this.reasonRef.current.value;

		// check
		if (isNaN(amount) || amount === 0) {
			this.setState({ inputError: "missing amount" });
			return
		}
		if (isNaN(value) || value === 0) {
			this.setState({ inputError: "missing value" });
			return
		}
		if (reason === "") {
			this.setState({ inputError: "missing reason" });
			return
		}

		// send request
		const data = {
			amount: amount,
			value_in_cents: value,
			reason: reason
		}
		api.postUrl("/api/admin/generate-redeemable-codes", data)
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
					<p className="lead">Click the button below to generate five redeemable codes. Remember to write them down afterwards.<br />
						Value is in cents. Enter 500 for $5, 1000 for $10.
					</p>
					<div className="row">
						<div className="col-12 col-md-2">
							<label htmlFor="amount">&#35; of codes</label>
							<input className="form-control" type="number" id="amount" name="amount" placeholder="max 50" ref={this.amountRef}></input>
						</div>

						<div className="col-12 col-md-3">
							<label htmlFor="reason">Value in cents</label>
							<input className="form-control" type="text" id="value" name="value" placeholder="eg 500/1000" ref={this.valueRef} defaultValue={500}></input>
						</div>

						<div className="col-12 col-md">
							<label htmlFor="reason">Reason</label>
							<input className="form-control" type="text" id="reason" name="reason" placeholder="" ref={this.reasonRef}></input>
						</div>

						<div className="col-12 col-md-2">
							<label className="text-white" htmlFor="genbutton">.</label>
							<button className="form-control btn btn-primary" type="button" onClick={this.generateCodes} id="genbutton" name="genbutton">Generate</button>
						</div>
					</div>
					<p className="text-danger">{this.state.inputError}</p>
				</section>

				<section className="container mt-5 text-center">
					{ this.state.newCodes.map(code => (
						<h3 className="my-5 ca-mono-font">{code.code}</h3>
					))}
				</section>

				<hr className="my-5" />

				<section className="container text-center">
					<h2 className="font-weight-bold">Available Codes</h2>
					<table className="table table-responsive-md">
						<thead>
							<tr>
								<th scope="col">Batch</th>
								<th scope="col">#</th>
								<th scope="col">Generated</th>
								<th scope="col">Reason</th>
								<th scope="col">Amount</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.availableCodes
								.sort((a,b) => a.code.localeCompare(b.code) )
								.sort((a,b) => b.batch_number - a.batch_number )
								.map(code => (
								<tr>
									<th scope="row">{code.batch_number}</th>
									<th>{code.code}</th>
									<td>{Moment(code.created_at).format("MMM D h:mmA")}</td>
									<td>{code.reason}</td>
									<td>{Accounting.formatMoney(code.amount_in_cents / 100)}</td>
									<td className="text-success">Available</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>

				<hr className="my-5" />

				<section className="container mt-5 text-center">
					<h2 className="font-weight-bold">Redeemed Codes</h2>
					<table className="table table-responsive-md">
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
							{ this.state.redeemedCodes
								.sort((a,b) => Moment(b.redeemed_at).unix() - Moment(a.redeemed_at).unix() )
								.map(code => (
								<tr>
									<th scope="row">{code.code}</th>
									<td>{Moment(code.created_at).format("MMM D h:mmA")}</td>
									<td>{Moment(code.redeemed_at).format("MMM D h:mmA")}</td>
									<td>{code.redeemed_by_user.gus_username}</td>
									<td>{Accounting.formatMoney(code.amount_in_cents / 100)}</td>
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
