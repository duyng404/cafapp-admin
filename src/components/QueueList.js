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
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.state = {
			selected: [],
			collapsed: false,
		}
		if (this.props.collapsed) this.state.collapsed = true;
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
		const today = Moment();
		// if today, display in short form
		if (today.isSame(t, 'd')) {
			return Moment(t).format("h:mmA");
		}
		return Moment(t).format("MMM D h:mmA");
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

	toggleCollapse(e) {
		e.preventDefault();
		console.log(this.state.collapsed);
		this.setState( prevState => ({ collapsed: !prevState.collapsed }) );
	}

	toggleNext(e) {
		e.preventDefault();
		this.props.commitAction(this.state.selected);
		this.toggleSelectAll(e, true);
	}

	render () {
		return (
			<>
				<div className="d-flex justify-content-between">
					<div className="text-muted">total: { this.props.data.length }</div>
					<div className="h4">{ this.props.name }</div>
					<button className="btn btn-sm btn-link" type="button" onClick={this.toggleCollapse}>Hide</button>
				</div>
				{/* <h4 className="text-center">
					{ this.props.name }
				</h4> */}
				<FlipMove className="list-group" enterAnimation="fade" leaveAnimation="fade">
					{ !this.state.collapsed ?
					this.props.data.map(v => (
						<div className={`list-group-item py-0 ${this.state.selected.includes(v.id) ? 'bg-light' : ''}`} key={v.tag}>
							<div className="d-flex justify-content-around align-items-center ca-queue-row" onClick={() => this.toggleSelect(v.id)}>

									{ this.state.selected.includes(v.id) ?
									<div className="ca-checkbox ca-checked text-primary"><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
									:
									<div className="ca-checkbox"><i className="fa fa-square-o" aria-hidden="true"></i></div>
									}

								<div className="mx-2"><span className="text-muted">#{this.getFriendlyIDFromTag(v.tag)}</span></div>
								<div className="mx-2">{this.getMealFromOrder(v).product.name} + {this.getDrinkFromOrder(v).product.name}</div>
								<div className="mx-2 ml-auto">{ v.destination.name }</div>
								<div className="mx-2 ca-tag">{v.tag}</div>
								<div className="ml-3 text-right">
									<div className="w-100 ca-item-small">{v.user.full_name}</div>
									<div className="w-100 ca-item-small">{this.getTimeFromOrder(v)}</div>
								</div>
							</div>
						</div>
					))
					:
					<div className="list-group-item py-4" key="empty">
						<div className="text-center font-weight-light text-black-50">Hidden</div>
					</div>
					}
					{ this.props.data && this.props.data.length === 0 ?
						<div className="list-group-item py-4" key="empty">
							<div className="text-center font-weight-light text-black-50">nothing here</div>
						</div>
						: null
					}
				</FlipMove>
				{ this.props.commitAction && this.props.data && this.props.data.length > 0 ?
				<div className="d-flex justify-content-end mt-2">
					<button className="btn btn-link mx-2 ca-no-underline" type="button" onClick={this.toggleSelectAll}>
						<i className="fa fa-square-o" aria-hidden="true"></i>
						&nbsp;&#47;&nbsp;
						<i className="fa fa-check-square-o" aria-hidden="true"></i>
					</button>
					<button className="btn btn-primary" disabled={this.state.selected.length === 0} onClick={this.toggleNext}>Next</button>
				</div>
				: null }
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
