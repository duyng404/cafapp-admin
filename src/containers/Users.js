import React from 'react';

class Users extends React.Component {
    render() {
        return (
            <div>
                <section className="jumbotron jumbotron-fluid text-center bg-dark">
                    <div className="container">
                        <h1 className="jumbotron-heading text-ca-yellow2"><strong>Users</strong></h1>
                    </div>
                </section>
                <h1 className="text-center">User's Orders</h1>
                <table class="table" style={{height: "200px"}}>
                    <thead class="thead-light text-center">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Gus Usename</th>
                            <th scope="col">Total Orders</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td><button type="button" class="btn btn-outline-success">View details</button></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>5</td>
                            <td><button type="button" class="btn btn-outline-success">View details</button></td>
                        </tr>
                    </tbody>
                </table>
                <footer className="footer">
                    <div className="ca-footer bg-dark" id="footer">
                        CafApp &copy; Enactus Gustavus 2018
                    </div>
                </footer>
            </div>
        );
    }
}

export default Users;