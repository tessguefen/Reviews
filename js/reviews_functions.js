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

function Reviews_Batchlist_Approved ( id, checked, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Review_Approved_Update',
								'Review_ID='	+ encodeURIComponent( id ) +
								'&Approved='	+ ( checked ? 1 : 0 ),
								delegator );
}

function Reviews_Batchlist_Notify( id, checked, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'tgreviews',
								'Review_Notify_Update',
								'Review_ID='	+ encodeURIComponent( id ) +
								'&Notify='	+ ( checked ? 1 : 0 ),
								delegator );
}