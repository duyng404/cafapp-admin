import React from 'react';
import Moment from 'moment';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import * as types from '../types';

class QueueList extends React.Component {
	constructor(props){
		super(props);
		this.toggleSelectAll = this.toggleSelectAll.bind(this);
		this.toggleSelect = this.toggleSelect.bind(this);
		this.toggleNext = this.toggleNext.bind(this);
		this.state = {
			selected: [],
		}
	}
	getFriendlyIDFromTag(s) {
		const ss = s.split('-');
		return ss[ss.length-1];
	}

	getMealFromOrder(order) {
		const a = order.order_rows.filter(v => v.row_type === types.RowTypeNormal);
		return a[0];
	}

	getDrinkFromOrder(order) {
		const a = order.order_rows.filter(v => v.row_type === types.RowTypeIncluded);
		return a[0];
	}

	getTimeFromOrder(order) {
		const t = order.created_at;
		// if less than 20 mins ago, display in words
		if (Moment().unix() - Moment(t).unix() < 1200) {
			return Moment(t).fromNow();
		}
		return Moment(t).format("h:mmA");
	}

	toggleSelect(id) {
		const { selected } = this.state;
		if (selected.includes(id)) {
			this.setState({ selected: selected.filter(i => i !== id) });
		} else {
			this.setState({ selected: [...selected, id] });
		}
	}

	toggleSelectAll(e, none=false) {
		e.preventDefault();
		if (!none && this.state.selected.length < this.props.data.length) {
			this.setState({ selected: this.props.data.map(v => v.id)});
		} else {
			this.setState({ selected: []});
		}
	}

	toggleNext(e) {
		e.preventDefault();
		console.log("sending selected order to socket: ", this.state.selected);
		this.props.commitAction(this.state.selected);
		this.toggleSelectAll(e, true);
	}

	render () {
		return (
			<>
				<h4 className="text-center">{ this.props.name }</h4>
				<FlipMove className="list-group">
					{ this.props.data.map(v => (
						<div className={`list-group-item py-0 ${this.state.selected.includes(v.id) ? 'bg-light' : ''}`} key={v.tag}>
							<div className="row align-items-center ca-queue-row" onClick={() => this.toggleSelect(v.id)}>

									{ this.state.selected.includes(v.id) ?
									<div className="col-1 ca-checkbox ca-checked text-primary"><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
									:
									<div className="col-1 ca-checkbox"><i className="fa fa-square-o" aria-hidden="true"></i></div>
									}

								<div className="col-1"><span className="text-muted">#{this.getFriendlyIDFromTag(v.tag)}</span></div>
								<div className="col-4 ca-tag">{v.tag}</div>
								<div className="col-3 text-right">
									<div className="w-100 ca-item-small">{this.getMealFromOrder(v).product.name}</div>
									<div className="w-100 ca-item-small">{this.getDrinkFromOrder(v).product.name}</div>
								</div>
								<div className="col-3 text-right">
									<div className="w-100 ca-item-small">{v.user.full_name}</div>
									<div className="w-100 ca-item-small">{this.getTimeFromOrder(v)}</div>
								</div>
							</div>
						</div>
					))}
				</FlipMove>
				<div className="d-flex justify-content-end mt-2">
					<button className="btn btn-link mx-2 ca-no-underline" type="button" onClick={this.toggleSelectAll}>
						<i className="fa fa-square-o" aria-hidden="true"></i>
						&nbsp;&#47;&nbsp;
						<i className="fa fa-check-square-o" aria-hidden="true"></i>
					</button>
					<button className="btn btn-primary" disabled={this.state.selected.length === 0} onClick={this.toggleNext}>Next</button>

				</div>
			</>
		);
	}
}

QueueList.propTypes = {
	data: PropTypes.arrayOf(types.orderType),
	name: PropTypes.string,
	commitAction: PropTypes.func,
}

export default QueueList;
