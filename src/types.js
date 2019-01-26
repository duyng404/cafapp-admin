import PropTypes from 'prop-types';

// const

export const OrderStatusPlaced = 20
export const OrderStatusQueued   = 30
export const OrderStatusRequeued = 31
export const OrderStatusPrepping  = 40
export const OrderStatusShipping  = 50
export const OrderStatusDelivered = 60

// types

export const userType = PropTypes.shape ({
	id: PropTypes.number,
	created_at: PropTypes.created_at,
	updated_at: PropTypes.updated_at,
	first_name: PropTypes.string,
	last_name: PropTypes.string,
	full_name: PropTypes.string,
	email: PropTypes.string,
	gus_username: PropTypes.string,
	gus_id: PropTypes.number,
})

export const productType = PropTypes.shape ({
	id: PropTypes.number,
	tag: PropTypes.string,
	name: PropTypes.string,
	display_name: PropTypes.string,
	price_in_cents: PropTypes.number,
	image_url: PropTypes.string,
	description: PropTypes.string,
	description_html: PropTypes.string,
	status: PropTypes.number,
})

export const orderRowType = PropTypes.shape ({
	product_id: PropTypes.number,
	product: productType,
	quantity: PropTypes.number,
	subtotal_in_cents: PropTypes.number,
	row_type: PropTypes.int,
})

export const orderType = PropTypes.shape ({
	id: PropTypes.id,
	created_at: PropTypes.string,
	updated_at: PropTypes.string,
	uuid: PropTypes.string,
	tag: PropTypes.string,
	user_id: PropTypes.string,
	user: userType,
	delivery_fee_in_cents: PropTypes.number,
	caf_account_charge_amount_in_cents: PropTypes.number,
	total_in_cents: PropTypes.number,
	order_rows: PropTypes.arrayOf(orderRowType),
	destination_tag: PropTypes.string,
	status_code: PropTypes.number,
})
