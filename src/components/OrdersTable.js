import React from 'react';
import * as types from '../types';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Accounting from 'accounting';

class OrdersTable extends React.Component {
	constructor(props) {
		super(props);
		this.getFriendlyIDFromTag = this.getFriendlyIDFromTag.bind(this);
	}

	getFriendlyIDFromTag(s) {
		const ss = s.split('-');
		return ss[ss.length-1];
	}

    renderOrder(dataList) {
        const data = dataList.map((order,id) => {
            return (
                <tr key={id}>
                    <th scope="row">{this.getFriendlyIDFromTag(order.tag)}</th>
                    <td>
						<div className="w-100">
							{ order.order_rows.map(order_row => (
								<div className="mb-2" key={order_row.menu_item_id}>
									<div className="font-weight-bold">{ order_row.menu_item.display_name }</div>

									{ order_row.sub_rows.map(sub_row => (
										<div className="d-flex justify-content-between align-items-center ml-4" key={sub_row.id}>
											<div>{ sub_row.product.display_name }</div>
											<div className="font-weight-bold">{Accounting.formatMoney(sub_row.product.price_in_cents / 100)}</div>
										</div>
									))}
								</div>
							))}

							<hr />

							<div className="d-flex justify-content-between align-items-center">
								<div className="font-weight-bold">Meal plan charge</div>
								<div className="font-weight-bold text-info">{Accounting.formatMoney(order.caf_account_charge_amount_in_cents / 100)}</div>
							</div>

							<div className="d-flex justify-content-between align-items-center">
								<div className="font-weight-bold">Delivery Fee</div>
								<div className="font-weight-bold">{Accounting.formatMoney(order.delivery_fee_in_cents / 100)}</div>
							</div>

							<hr />

							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h5 className="font-weight-bold">Total</h5>
								</div>
								<div className="font-weight-bold">{Accounting.formatMoney(order.total_in_cents / 100)}</div>
								{/* <div>
									<h5 className="font-weight-bold text-ca-yellow2">{{ formatMoney .order.TotalInCents }}</h5>
								</div> */}
							</div>
						</div>
					</td>
					<td>{types.verbalizeType(order.status_code)}</td>
					<td>
						<div><span className="font-weight-bold">Name:</span> {order.user.first_name + " " + order.user.last_name}</div>
						<div><span className="font-weight-bold">GusID:</span> {order.user.gus_id}</div>
						<div><span className="font-weight-bold">GusUsername:</span> {order.user.gus_username}</div>
						<div><span className="font-weight-bold">Phone:</span> {order.user.phone_number}</div>
						<div><span className="font-weight-bold">To:</span> {order.destination.name}</div>
					</td>
					<td>
						{ order.status_updates.map((v,id) => (
							<div key={id}>{`${types.verbalizeType(v.status_code)} at ${Moment(v.created_at).format("MMM D h:mmA")}`}</div>
						))}
						<div></div>
					</td>
                </tr>
            );
        });
        return data;
	}

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead className="">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Summary</th>
							<th scope="col">Status</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {this.renderOrder(this.props.data)}
                    </tbody>
                </table>
            </div>
        )
    }
};

OrdersTable.propTypes = {
	data: PropTypes.arrayOf(types.orderType),
}

export default OrdersTable;
