import React from 'react';
import Moment from 'moment';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import * as types from '../types';

class QueueList extends React.Component {
	constructor(props){
		super(props);
		this.toggleSelectAll = this.toggleSelectAll.bind(this);
		this.toggleSelectDorm = this.toggleSelectDorm.bind(this);
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

	toggleSelectDorm(e) {
		e.preventDefault();
		let dorm = "";
		if (e.target.value && e.target.value !== "") dorm = e.target.value;
		this.setState(prevState => ({ selected: this.props.data.filter(v => v.destination.tag === dorm || prevState.selected.includes(v.id)).map(v => v.id)}));
	}

	toggleSelectAll(e, none=false) {
		if (e.target.value && e.target.value === "none") none = true;
		if (e.target.value && e.target.value === "all") none = false;
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
			<div className="ca-queuelist-container">
				{/* Title bar */}
				<div className="d-flex justify-content-between">
					<div className="text-muted">total: { this.props.data.length }</div>
					<div className="h4">{ this.props.name }</div>
					<button className="btn btn-sm btn-link" type="button" onClick={this.toggleCollapse}>Hide/Show</button>
				</div>

				{/* Filter bar */}
				{ !this.state.collapsed && this.props.destinations && this.props.destinations.length > 0 ?
					<div className="btn-group d-flex mb-2" role="group" aria-label="Selection Filter">
						<button type="button" disabled className="btn btn-outline-secondary btn-sm w-100">Dorms:</button>
						{ this.props.destinations.map(v => (
							<button type="button" className="btn btn-outline-secondary btn-sm w-100" value={v.tag} key={v.tag} onClick={this.toggleSelectDorm}>{v.tag}</button>
						)) }
						<button type="button" className="btn btn-outline-primary btn-sm w-100" value="all" onClick={this.toggleSelectAll}>All</button>
						<button type="button" className="btn btn-outline-primary btn-sm w-100" value="none" onClick={this.toggleSelectAll}>None</button>
					</div>
					: null
				}

				{/* List starts here */}
				<FlipMove className="list-group" enterAnimation="fade" leaveAnimation="fade">

					{/* If hidden */}
					{ this.state.collapsed ?
						<div className="list-group-item py-4" key="empty">
							<div className="text-center font-weight-light text-black-50">Hidden</div>
						</div>
						: null
					}

					{/* If has content */}
					{ !this.state.collapsed ?
						this.props.data.sort((a,b) => Moment(b.updated_at).unix() - Moment(a.updated_at).unix() ).map(v => (
							<div className={`list-group-item py-0 ${this.state.selected.includes(v.id) ? 'bg-light' : ''}`} key={v.tag}>
								<div className="d-flex justify-content-around align-items-center ca-queue-row" onClick={() => this.toggleSelect(v.id)}>

										{/* checkbox */}
										{ this.state.selected.includes(v.id) ?
										<div className="ca-checkbox ca-checked text-primary"><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
										:
										<div className="ca-checkbox"><i className="fa fa-square-o" aria-hidden="true"></i></div>
										}

									<div className="mx-2"><span className="text-muted">#{this.getFriendlyIDFromTag(v.tag)}</span></div>
									{/* <div className="mx-2">{this.getMealFromOrder(v).product.name} + {this.getDrinkFromOrder(v).product.name}</div> */}
									<div className="ml-3 text-left">
										<div className="w-100">{this.getMealFromOrder(v).product.name}</div>
										<div className="w-100">{this.getDrinkFromOrder(v).product.name}</div>
									</div>
									<div className="mx-2 ml-auto">{ v.destination.name }</div>
									{/* <div className="mx-2 d-lg-none d-xl ca-tag">{ v.tag }</div> */}
									<div className="ml-3 text-right">
										<div className="w-100 ca-item-small ca-tag">{ v.tag }</div>
										<div className="w-100 ca-item-small ca-dimmed">{v.user.full_name}</div>
										<div className="w-100 ca-item-small ca-dimmed">{this.getTimeFromOrder(v)}</div>
									</div>
								</div>
							</div>
						))
						: null
					}

					{/* If has no content */}
					{ !this.state.collapsed && this.props.data && this.props.data.length === 0 ?
						<div className="list-group-item py-4" key="empty">
							<div className="text-center font-weight-light text-black-50">nothing here</div>
						</div>
						: null
					}

				{/* List ends here */}
				</FlipMove>

				{/* Bottom bar */}
				{ this.props.commitAction && this.props.data && this.props.data.length > 0 ?
				<div className="d-flex justify-content-end mt-2">
					{/* <button className="btn btn-link mx-2 ca-no-underline" type="button" onClick={this.toggleSelectAll}>
						<i className="fa fa-square-o" aria-hidden="true"></i>
						&nbsp;&#47;&nbsp;
						<i className="fa fa-check-square-o" aria-hidden="true"></i>
					</button> */}
					<button className="btn btn-primary" disabled={this.state.selected.length === 0} onClick={this.toggleNext}>Next</button>
				</div>
				: null }

			</div>
		);
	}
}

QueueList.propTypes = {
	data: PropTypes.arrayOf(types.orderType),
	name: PropTypes.string,
	commitAction: PropTypes.func,
	destinations: PropTypes.arrayOf(types.destinationType),
}

export default QueueList;
