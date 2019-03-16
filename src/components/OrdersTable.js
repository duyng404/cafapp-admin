import React from 'react';
import * as types from '../types';
import PropTypes from 'prop-types';
import Moment from 'moment';

class OrdersTable extends React.Component {
	constructor(props) {
		super(props);
		this.getFriendlyIDFromTag = this.getFriendlyIDFromTag.bind(this);
		this.formatMoney = this.formatMoney.bind(this);
	}

	formatMoney(amount) {
		return "$" + amount / 100;
	}

	getFriendlyIDFromTag(s) {
		const ss = s.split('-');
		return ss[ss.length-1];
	}

    renderOrder(dataList) {
        const data = dataList.map((order,id) => {
            return (
                <tr key = {id}>
                    <th scope="row">{this.getFriendlyIDFromTag(order.tag)}</th>
                    <td>
						<div class="w-100">
							{ order.order_rows.map(order_row => (
								<>
								<div class="mb-2">
									<div className="font-weight-bold">{ order_row.menu_item.display_name }</div>

									{ order_row.sub_rows.map(sub_row => (
										<div class="d-flex justify-content-between align-items-center ml-4">
											<div>{ sub_row.product.display_name }</div>
											<div className="font-weight-bold">{this.formatMoney(sub_row.product.price_in_cents)}</div>
										</div>
									))}
								</div>

								</>
							))}

							<hr />

							<div class="d-flex justify-content-between align-items-center">
								<div className="font-weight-bold">Meal plan charge</div>
								<div className="font-weight-bold text-info">{this.formatMoney(order.caf_account_charge_amount_in_cents)}</div>
							</div>

							<div class="d-flex justify-content-between align-items-center">
								<div className="font-weight-bold">Delivery Fee</div>
								<div className="font-weight-bold">{this.formatMoney(order.delivery_fee_in_cents)}</div>
							</div>

							<hr />

							<div class="d-flex justify-content-between align-items-center">
								<div>
									<h5 class="font-weight-bold">Total</h5>
								</div>
								<div className="font-weight-bold">{this.formatMoney(order.total_in_cents)}</div>
								{/* <div>
									<h5 class="font-weight-bold text-ca-yellow2">{{ formatMoney .order.TotalInCents }}</h5>
								</div> */}
							</div>
						</div>
					</td>
					<td>{types.verbalizeType(order.status_code)}</td>
					<td>
						<div>{order.user.first_name + " " + order.user.last_name}</div>
						<div>{order.destination.name}</div>
					</td>
					<td>
						{ order.status_updates.map(v => (
							<div>{`${types.verbalizeType(v.status_code)} at ${Moment(v.created_at).format("MMM D h:mmA")}`}</div>
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
