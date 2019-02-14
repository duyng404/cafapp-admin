import React from 'react';

class UserTable extends React.Component {
    renderUser(dataList) {
        const data = dataList.map((user) => {
            return (
                <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.full_name}</td>
                    <td>{user.gus_username}</td>
                    <td>3</td>
                    <td><button type="button" class="btn btn-link">View details</button></td>
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