function Reviews_Batchlist() {
	var self = this;
	Load_Additional_Fields( function( response) {
		if ( response.success ) {
			self.additional_fields = response.data;
			self.additional_fields_length = self.additional_fields.length;
			MMBatchList.call( self, 'jsReviews_Batchlist' );
			self.Feature_SearchBar_SetPlaceholderText( 'Search Reviews...' );
			self.SetDefaultSort( 'id', '-' );
			self.Feature_Add_Enable('Add Review');
			self.Feature_Edit_Enable('Edit Review(s)');
			self.Feature_Delete_Enable('Delete Reviews(s)');
			self.Feature_RowDoubleClick_Enable();
			self.processingdialog = new ProcessingDialog();
		}
	});
}

DeriveFrom( MMBatchList, Reviews_Batchlist );

Reviews_Batchlist.prototype.onLoad = Reviews_Load_Query;

Reviews_Batchlist.prototype.onCreateRootColumnList = function() {
		var self = this;
		var i, i_len;
		var columnlist = [];

		columnlist.push(	new MMBatchList_Column_CheckboxSlider('Approved', 'approved', 'approved', function( item, checked, delegator ) {
								Reviews_Batchlist.Update_Approved( item, checked, delegator );
							} ),
							
							new MMBatchList_Column_Name( 'Review ID', 'id', 'id')
							.SetAdvancedSearchEnabled(false)
							.SetDisplayInMenu(false)
							.SetDisplayInList(false),

							new Reviews_ProductLookup_Column( 'Product Code', 'product_code', 'product_code'),

							new MMBatchList_Column_Name( 'Product Name', 'product_name', 'product_name')
							.SetOnDisplayEdit( function( record ) { return DrawMMBatchListString_Data( !record.product_name ? '' : record.product_name ); } )
							.SetUpdateOnModifiedOnly( true ),

							new MMBatchList_Column_Name( 'Product ID', 'product_id', 'product_id')
							.SetAdvancedSearchEnabled(false)
							.SetDisplayInMenu(false)
							.SetDisplayInList(false),
							
							new MMBatchList_Column_DateTime( 'Date', 'created', 'created'),

							new MMBatchList_Column_Name( 'Customer ID', 'cust_id', 'cust_id')
							.SetAdvancedSearchEnabled(false)
							.SetDisplayInMenu(false)
							.SetDisplayInList(false),

							new MMBatchList_Column_Numeric( 'Order ID', 'order_id', 'order_id')
							.SetOnDisplayEdit( function( record ) { return DrawMMBatchListString_Data( record.order_id ); } )
							.SetUpdateOnModifiedOnly( true ),

							new MMBatchList_Column_Numeric( 'Rating', 'rating', 'rating' ),

							new MMBatchList_Column_Name( 'Name', 'name', 'name' ),

							new MMBatchList_Column_Name( 'Email', 'email', 'email' ),

							new MMBatchList_Column_Name( 'Location', 'location', 'location' ),

							new MMBatchList_Column_CheckboxSlider('Notify', 'notify', 'notify', function( item, checked, delegator ) {
								Reviews_Batchlist.Update_Notify( item, checked, delegator );
							} ),

							new MMBatchList_Column_Name( 'Title', 'title', 'title'),

							new MMBatchList_Column_TextArea( 'Edit Summary', 'Summary', 'summary', 'summary' )
						);

		for ( i = 0, i_len = self.additional_fields_length; i < i_len; i++ ) {
			columnlist.push( new MMBatchList_Column_Text( self.additional_fields[ i ].name, 'AdditionalFields_' + self.additional_fields[ i ].code, 'AdditionalFields:' + self.additional_fields[ i ].code ).SetAdvancedSearchEnabled(false).SetSortByField( '' ) );
		}


	return columnlist;
}

Reviews_Batchlist.prototype.onCreate = function() {
	var self = this;
	var i, i_len;
	var record;
	record = new Object();
	record.approved = 0;
	record.question = '';
	record.created = Date.now() / 1000 | 0;
	record.cust_id = 0;
	record.rating = '';
	record.name = '';
	record.email = '';
	record.location = '';
	record.notify = 0;
	record.title = '';
	record.summary = '';
	record.order_id = 0;
	record.product_id = 0;
	record.product_code = '';
	record.product_name = '';
	for ( i = 0, i_len = self.additional_fields_length; i < i_len; i++ ) {
		var code = 'AdditionalFields_' + self.additional_fields[ i ].code;
		record[code] = '';
	}
	return record;
}

Reviews_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	Reviews_Batchlist_Update( item.record.id, item.record.mmbatchlist_fieldlist, callback, delegator );
}

Reviews_Batchlist.Update_Approved = function( item, checked, delegator ) {
	Reviews_Batchlist_Approved( item.record.id, checked, function( response ) {}, delegator );
}

Reviews_Batchlist.Update_Notify = function( item, checked, delegator ) {
	Reviews_Batchlist_Notify( item.record.id, checked, function( response ) {}, delegator );
}

Reviews_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Reviews_Batchlist_Insert( item.record.mmbatchlist_fieldlist, callback, delegator );
}

Reviews_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Reviews_Batchlist_Delete( item.record.id, callback, delegator );
}