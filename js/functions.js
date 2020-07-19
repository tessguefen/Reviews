/* eslint-disable */
function Load_Additional_Fields( callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Load_All_AdditionalFields',
								'',
								delegator );
}

function Product_Reviews_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'Product_Reviews_Load_Query',
	{
		Filter:			filter,
		Sort:			sort,
		Offset:			offset,
		Count: 			count
	}, delegator );
}

function Product_Review_Insert( data, callback, delegator )
{

	console.log(data);
	return AJAX_Call_Module_JSON( callback, 'admin', 'tgreviews', 'Product_Review_Insert',
	{
		Approved:	data.approved,
		Created:		data.created,
		Order_ID:		data.order_id,
		Rating:			data.rating,
		Notify:			data.notify,
		Notified:		data.notified,
		Verified:		data.verified,
		Store_Reply:	data.store_rply,
		Name:			data.name,
		Email:			data.email,
		Location:		data.location,
		Summary:		data.summary,
		Title:			data.title,
		Product_Code:	data.product_code
	}, delegator );
}
