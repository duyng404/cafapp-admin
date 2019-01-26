import React from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import * as types from '../types';

class QueueList extends React.Component {
	getFriendlyIDFromTag(s) {
		const ss = s.split('-');
		return ss[ss.length-1];
	}

	render () {
		return (
			<>
				<h4 className="text-center">{ this.props.name }</h4>
				<FlipMove className="list-group">
					{ this.props.data.map(v => (
						<div className="list-group-item d-flex justify-content-between" key={v.tag}>
							<div className="">{this.getFriendlyIDFromTag(v.tag)}</div>
							<div>{v.tag}</div>
						</div>
					))}
				</FlipMove>
			</>
		);
	}
}

QueueList.propTypes = {
	data: PropTypes.arrayOf(types.orderType),
	name: PropTypes.string,
}

export default QueueList;
