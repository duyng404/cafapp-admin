import React from 'react';
import * as api from '../utils/api';
class UserTable extends React.Component {
    renderUser(dataList) {
        const data = dataList.map((user) => {
            return (
                <tr>
                    <th scope="row">{user.user_id}</th>
                    <td>{user.full_name}</td>
                    <td>{user.gus_username}</td>
                    <td>{user.total_orders}</td>
                    <td><button value={user.user_id} type="button" onClick={this.props.viewUserDetail} class="btn btn-link">View details</button></td>
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
                            <th scope="col">ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Gus Username</th>
                            <th scope="col">Total Orders</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {this.renderUser(this.props.data)}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default UserTable;