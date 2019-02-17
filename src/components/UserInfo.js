import React from 'react';
import Moment from 'moment';
class UserInfo extends React.Component {
    formatDate(dateStr){
        //jan 22 8:00pm
        return Moment(dateStr).format("MMM D h:mmA");
    }
    renderOrders(orders) {
        const data = orders.map((order) => {
            return (
                <tr>
                    <td>{order.id}</td>
                    <td>{order.destination.name}</td>
                    <td>{this.formatDate(order.created_at)}</td>
                    <td>${order.total_in_cents/100}</td>
                    <td>{order.status_code}</td>
                    <td><button className="btn btn-link">View details</button></td>
                </tr>
            );
        });
        return data;
    }
    render() {
        const data = this.props.user;
        return (
            <div>
                <div className="user-info text-center">
                    <div>
                        <p>Fullname: {data.full_name}</p>
                        <p>Gus Username: {data.gus_username}</p>
                        <p>Gus ID: {data.gus_id}</p>
                    </div>
                </div>
                <h3 className="font-weight-bold">Order Details</h3>
                {data.allOrders.length !== 0 ?
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrders(data.allOrders)}
                        </tbody>
                    </table> :
                    <p className="text-muted">This user has not placed an order</p>
                }
            </div>
        );
    }
}

export default UserInfo;