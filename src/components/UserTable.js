import React from 'react';
import * as api from '../utils/api';
import UserInfo from './UserInfo';
class UserTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo: {}
        }
        this.handleViewDetailsUser = this.handleViewDetailsUser.bind(this);
    }
    handleViewDetailsUser(e){
        //get data of one particular user
        api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users/${e.target.value}`)
        .then(res => {
            res.data.userInfo.allOrders = res.data.allOrders;
            console.log(res);
            this.setState({userInfo: res.data.userInfo})
            return
        });
    }
    renderUser(dataList) {
        const data = dataList.map((user) => {
            return (
                <tr>
                    <th scope="row">{user.user_id}</th>
                    <td>{user.full_name}</td>
                    <td>{user.gus_username}</td>
                    <td>{user.total_orders}</td>
                    <td><button value={user.user_id} type="button" onClick={this.handleViewDetailsUser} class="btn btn-link">View details</button></td>
                </tr>
            );
        });
        return data;
    }
    render() {
        console.log(this.state.userInfo)
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
                <h3 className="font-weight-bold">User Details</h3>
                {Object.keys(this.state.userInfo).length !== 0 ? 
                    <UserInfo user={this.state.userInfo} />
                    :
                    <p className="text-muted">No user selected</p>
                }
            </div>
        )
    }
};

export default UserTable;