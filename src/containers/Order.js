import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date){
        this.setState({
            endDate: date
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2 font-weight-bold">Orders Management</h1>
                    {/* <div>abcxyz</div> */}
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3>Search filters</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-row">
                                <div className="col-6">
                                    <label htmlFor="filter-name">Start Date</label>
                                    <br/>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChangeStart}
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="filter-name">End Date</label>
                                    <br/>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.handleChangeEnd}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <button className="btn btn-primary" type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;