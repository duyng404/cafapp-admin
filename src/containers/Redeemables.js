import React from 'react';
import * as api from '../utils/api';

class Generate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allCodes: [],
		}
	}
	render () {
		return (
			<>
				<section className="container mt-5 text-center">
					<h2 className="font-weight-bold">Generate Redeemable Codes</h2>
					<div className="my-4"></div>
					<p className="lead">Click the button below to generate five redeemable codes. Remember to write them down afterwards.</p>
					<button className="btn btn-primary btn-lg" type="button">Generate 5 Redeemable Codes</button>
				</section>

				<section className="container mt-5 text-center">
					<h3 className="my-5">CA-ABCD-1234-ABCD</h3>
					<h3 className="my-5">CA-ABCD-1234-ABCD</h3>
					<h3 className="my-5">CA-ABCD-1234-ABCD</h3>
					<h3 className="my-5">CA-ABCD-1234-ABCD</h3>
					<h3 className="my-5">CA-ABCD-1234-ABCD</h3>
				</section>

				<hr className="my-5" />

				<section className="container text-center">
					<h2 className="font-weight-bold">Available Codes</h2>
					<table class="table table-responsive-md">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Generated</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row"></th>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</section>

				<hr className="my-5" />

				<section className="container mt-5 text-center">
					<h2 className="font-weight-bold">Redeemed Codes</h2>

				</section>
			</>
		)
	}
}

export default Generate;
