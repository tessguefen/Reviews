function Load_Additional_Fields( callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Load_Additional_Fields',
								'',
								delegator );
}
function Reviews_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Reviews_Load_Query',
								'&Filter=' + EncodeArray( filter ) +
								'&Sort=' + encodeURIComponent( sort ) +
								'&Offset=' + encodeURIComponent( offset ) +
								'&Count=' + encodeURIComponent( count ),
								delegator );
}

function Reviews_Batchlist_Update( id, fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'tgreviews',
									   'Reviews_Update',
									   'Review_ID=' + encodeURIComponent( id ),
									   fieldlist,
									   delegator );
}
function Reviews_Batchlist_Insert( fieldlist, callback, delegator ) { 
	return AJAX_Call_Module_FieldList( callback,
									   'admin',
									   'tgreviews',
									   'Reviews_Insert',
									   '',
									   fieldlist,
									   delegator );
}
function Reviews_Batchlist_Delete( id, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Reviews_Delete',
								'Review_ID=' + encodeURIComponent( id ),
								delegator );
}