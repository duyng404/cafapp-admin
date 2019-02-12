import React from 'react';

class Users extends React.Component {
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
									<label for="filter-sort">Sort By</label>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>3</td>
                            <td><button type="button" class="btn btn-link">View details</button></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>5</td>
                            <td><button type="button" class="btn btn-link">View details</button></td>
                        </tr>
                    </tbody>
				</table>

				{/* <p className="text-muted">No results</p> */}

				<div className="my-4"></div>

				<h3>User Details</h3>

				<p className="text-muted">No user selected</p>
            </div>
        );
    }
}

export default Users;
