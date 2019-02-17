import React from 'react';
import * as api from '../utils/api';
import UserTable from '../components/UserTable';
import UserInfo from '../components/UserInfo';
class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usersData: [],
			userInfo: {}
		}
		this.handleViewDetailsUser = this.handleViewDetailsUser.bind(this);
	}
	handleViewDetailsUser(e){
        //get data of one particular user
        api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users/${e.target.value}`)
        .then(res => {
            res.data.userInfo.allOrders = res.data.allOrders;
            this.setState({userInfo: res.data.userInfo})
            return
        });
    }
	componentDidMount() {
		//get all users' data
		api.fetchUrl(`${process.env.REACT_APP_BACKEND_URL}/api/admin/view-users`)
			.then(res => {
				this.setState({ usersData: res.data });
				return;
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2 font-weight-bold">Users Management</h1>
					<div>abcxyz</div>
				</div>
				<div className="card">
					<div className="card-body">
						<h3>Search filters</h3>
						<form>
							<div className="form-row">
								<div className="col-4">
									<label htmlFor="filter-name">Full Name</label>
									<input type="text" className="form-control" placeholder="eg. Jon Smith" name="filter-fullname" id="filter-fullname" />
								</div>
								<div className="col-4">
									<label htmlFor="filter-name">Gus Username</label>
									<input type="text" className="form-control" placeholder="eg. jsmith3" name="filter-gususername" id="filter-gususername" />
								</div>
								<div className="col-4">
									<label htmlFor="filter-sort">Sort By</label>
									<select className="form-control" id="filter-sort">
										<option value="title">ID ascending</option>
										<option value="titleR">ID descending</option>
										<option value="date">Full Name A-Z</option>
										<option value="dateR">Full Name Z-A</option>
										<option value="language">Gus Username A-Z</option>
										<option value="languageR">Gus Username Z-A</option>
									</select>
								</div>
							</div>
							<div className="d-flex justify-content-end mt-2">
								<button className="btn btn-primary">Search</button>
							</div>
						</form>
					</div>
				</div>

				<div className="my-4"></div>

				<h3>Search results</h3>
				{this.state.usersData.length !== 0 ?
					<UserTable viewUserDetail={this.handleViewDetailsUser} data={this.state.usersData} />
					 : 
					 <p className="text-muted">No results</p>
				}
				<div className="my-4"></div>
				<h3 className="font-weight-bold">User Details</h3>
                {Object.keys(this.state.userInfo).length !== 0 ? 
                    <UserInfo user={this.state.userInfo} />
                    :
                    <p className="text-muted">No user selected</p>
                }
			</div>
		);
	}
}

export default Users;
