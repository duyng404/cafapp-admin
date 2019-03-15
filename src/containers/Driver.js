import React from 'react';
import * as api from '../utils/api';
import * as types from '../types';
import Moment from 'moment';

class Driver extends React.Component {
	constructor(props) {
		super(props);
		this.getPhoneNum = this.getPhoneNum.bind(this);
		this.state = {
			q: [],
		}
	}

	getFriendlyIDFromTag(s) {
		const ss = s.split('-');
		return ss[ss.length-1];
	}

	getPhoneNum(s) {
		s = s.replace(/\D/g,'');
		console.log(s);
		return s;
	}

	// filter out the orders for queue, prep, shipping and delivered to pass into the components
	extractData(data) {
		return data.filter(v => v.status_code === types.OrderStatusShipping);
	}

	componentDidMount() {
		api.fetchUrl("/api/admin/view-queue")
			.then(response => {
				if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
					this.setState({q:[]});
					return;
				}
				this.setState({q : this.extractData(response.data)});
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		return (
			<div className="ca-container">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">Driver's interface</h1>
					<button className="btn btn-link">Refresh</button>
				</div>

				<p className="text-center">Click any orange box below to make a call (only on mobile)</p>
				{ this.state.q.sort((a,b) => Moment(b.updated_at).unix() - Moment(a.updated_at).unix() ).map(v => (
					<a href={"tel:+1" + this.getPhoneNum(v.user.phone_number)} role="button" className="btn btn-primary btn-block btn-lg fullwidth text-white">
						<div className="d-flex justify-content-around align-items-center">
							<div>#{this.getFriendlyIDFromTag(v.tag)}</div>
							<div className="text-left">
								{v.order_rows.map(vv => {
									return vv.sub_rows.map(vvv => (
										<div className="w-100" key={vvv.id}>{vvv.product.name}</div>
									))
								})}
							</div>
							<div className="ml-3 text-right">
								<div className="w-100">{v.user.full_name}</div>
								<div className="w-100">{v.user.phone_number}</div>
							</div>
						</div>
					</a>
				))
				}
			</div>
		)
	}
}

export default Driver;
