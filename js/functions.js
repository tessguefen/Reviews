/* eslint-disable */

/* AdditionalFields */

function AdditionalFields_Load_Query_All( callback, delegator ) {
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'AdditionalFields_Load_Query',
	{
		Offset:			0,
		Count: 			0
	}, delegator );
}

function AdditionalFields_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'AdditionalFields_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count: 			count
	}, delegator );
}

function AdditionalField_Insert( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'AdditionalField_Insert',
	{
		Code:	data.code,
		Name:	data.name
	}, delegator );
}

function AdditionalField_Update( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'AdditionalField_Update',
	{
		ID:		data.id,
		Code:	data.code,
		Name:	data.name
	}, delegator );
}

function AdditionalField_Delete( data, callback, delegator )
{
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'AdditionalField_Delete',
	{
		ID:		data.id,
		Code:	data.code,
		Name:	data.name
	}, delegator );
}

/* Product_Reviews */

function Product_Reviews_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'Product_Reviews_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count: 			count
	}, delegator );
}

function Product_Review_Insert( data, additionalfields, callback, delegator )
{
	var customfields_length = additionalfields.length;

	var fields = {
		Approved:			data.approved,
		Created:			data.created,
		Order_ID:			data.order_id,
		Rating:				data.rating,
		Notify:				data.notify,
		Notified:			data.notified,
		Verified:			data.verified,
		Store_Reply:		data.store_rply,
		Name:				data.name,
		Email:				data.email,
		Location:			data.location,
		Summary:			data.summary,
		Title:				data.title,
		Product_Code:		data.product_code,
		AdditionalFields:	{}
	};

	if ( customfields_length ) {
		for ( i = 0, i_len = customfields_length; i < i_len; i++ ) {
			fields.AdditionalFields[ additionalfields[ i ].code ] = data[ 'AdditionalFields:' + additionalfields[ i ].code ];
		}
	}

	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'Product_Review_Insert', fields, delegator );
}


function Product_Review_Update( data, additionalfields, callback, delegator )
{
	var customfields_length = additionalfields.length;

	var fields = {
		ID:					data.id,
		Approved:			data.approved,
		Created:			data.created,
		Order_ID:			data.order_id,
		Rating:				data.rating,
		Notify:				data.notify,
		Notified:			data.notified,
		Verified:			data.verified,
		Store_Reply:		data.store_rply,
		Name:				data.name,
		Email:				data.email,
		Location:			data.location,
		Summary:			data.summary,
		Title:				data.title,
		Product_Code:		data.product_code,
		AdditionalFields:	{}
	};

	if ( customfields_length ) {
		for ( i = 0, i_len = customfields_length; i < i_len; i++ ) {
			fields.AdditionalFields[ additionalfields[ i ].code ] = data[ 'AdditionalFields:' + additionalfields[ i ].code ];
		}
	}

	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'Product_Review_Update', fields, delegator );
}
