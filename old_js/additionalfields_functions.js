function AdditionalFields_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'AdditionalFields_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function AdditionalFields_Batchlist_Update( id, fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'tgreviews',
									   'AdditionalFields_Update',
									   'Field_ID=' + encodeURIComponent( id ),
									   fieldlist,
									   delegator );
}
function AdditionalFields_Batchlist_Insert( fieldlist, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'tgreviews',
									   'AdditionalFields_Insert',
									   '',
									   fieldlist,
									   delegator );
}
function AdditionalFields_Batchlist_Delete( id, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'AdditionalFields_Delete',
								'Field_ID=' + encodeURIComponent( id ),
								delegator );
}