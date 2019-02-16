import React from 'react';

class UserInfo extends React.Component {
    formatDate(dateStr){
        //jan 22 8:00pm
        let returnStr = "";
        const dateObj = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        };
        //format date
        const listDate = dateStr.split("T");
        const date = listDate[0].split("-");
        date.shift();
        date[0] = dateObj[date[0]];
        returnStr = date.join(" ");
        //format tiem
        const time = listDate[1].split(":");
        time.pop();
        returnStr = returnStr.concat(" ").concat(time.join(":"));
        return returnStr;
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