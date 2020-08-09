/* eslint-disable */

// AdditionalField_Column

function AdditionalField_Column( customfield, code_field )
{
	var column;

	column = new MMBatchList_Column_Text( 'Field: ' + customfield.name, code_field, code_field );

	column.SetOnRetrieveValue( function( record )
	{
		if ( record.hasOwnProperty( 'AdditionalFields' ) &&
			 record.AdditionalFields.hasOwnProperty( customfield.code ) )
		{
			return record.AdditionalFields[ customfield.code ];
		}

		return '';
	} );

	column.SetOnSetValue( function( record, value )
	{
		if ( !record.hasOwnProperty( 'AdditionalFields' ) ) {
			record.AdditionalFields = new Object();
		}

		record.AdditionalFields[ customfield.code ] = value;
	} );

	return column;
}

// Product Columns

function ProductField_Column( field, code_field )
{
	var column;

	if ( code_field === 'code' ) {
		column = new Reviews_ProductLookup_Column( 'Product ' + field.name, 'Product:' + field.code, code_field )
	} else {
		column = new MMBatchList_Column_Text( 'Product ' + field.name, 'Product:' + field.code, code_field );
	}

	column.SetOnRetrieveValue( function( record )
	{
		if ( record.hasOwnProperty( 'Product' ) &&
			 record.Product.hasOwnProperty( field.code ) )
		{
			return record.Product[ field.code ];
		}

		return '';
	} );

	column.SetOnSetValue( function( record, value )
	{
		if ( !record.hasOwnProperty( 'Product' ) ) {
			record.Product = new Object();
		}

		record.Product[ field.code ] = value;
	} );

	return column;
}

function ProductReview_List( product, auto_approve )
{
	var self = this;
	self.auto_approve = auto_approve;
	self.product = product;

	AdditionalFields_Load_Query_All( function( response )
	{
		self.additional_fields = response.data.data;
		self.additional_fields_length = self.additional_fields.length;

		if ( CanI( 'SYSM', 0, 0, 1, 0 ) )
		{
			self.approved_column =	new MMBatchList_Column_CheckboxSlider('Approved', 'approved', 'approved', function( item, checked, delegator ) {
										ProductReview_List.Update_Approved( item, checked, function () {
											if (checked === true && item.record.notify === 1 && item.record.email && item.record.notified === 0) {
												self.Refresh();
											}
										}, delegator );
									} );
			self.notify_column =	new MMBatchList_Column_CheckboxSlider('Notify', 'notify', 'Notify', function( item, checked, delegator ) {
										ProductReview_List.Update_Notify( item, checked, function(){}, delegator );
									} );
			self.verified_column =	new MMBatchList_Column_CheckboxSlider('Verified Buyer', 'verified', 'Verified', function( item, checked, delegator ) {
										ProductReview_List.Update_Verified( item, checked, function(){}, delegator );
									} );
		
		} else {
			self.approved_column =	new MMBatchList_Column_Checkbox( 'Approved ', 'approved', 'approved' );
			self.notify_column =	new MMBatchList_Column_Checkbox( 'Notify ', 'notify', 'Notify' );
			self.verified_column =	new MMBatchList_Column_Checkbox( 'Verified Buyer ', 'verified', 'Verified' );
		}

		MMBatchList.call( self, 'batchlist_productreviews' );
		self.Feature_SearchBar_SetPlaceholderText( 'Search Reviews...' );
		self.SetDefaultSort( 'id', '-' );
		self.Feature_OnDemandColumns_Enable();

		if (self.product && self.product.id) {
			self.OnSearch_GetFilter_AddHook( this.Product_onSearch_GetFilter );
		}

		if ( CanI( 'SYSM', 0, 1, 0, 0 ) ) {
			self.Feature_Add_Enable('Add Review');
		}

		if ( CanI( 'SYSM', 0, 0, 1, 0 ) ) {
			self.Feature_Edit_Enable('Edit Review(s)');
			self.Feature_RowDoubleClick_Enable();
		}

		if ( CanI( 'SYSM', 0, 0, 0, 1 ) ) {
			self.Feature_Delete_Enable('Delete Reviews(s)');
		}

		self.processingdialog = new ProcessingDialog();
	});
}

DeriveFrom( MMBatchList, ProductReview_List );

ProductReview_List.prototype.onLoad = Product_Reviews_Load_Query;

ProductReview_List.prototype.onCreateRootColumnList = function()
{
		var self = this;
		var i, i_len;
		var columnlist = [];

		columnlist.push(
			new MMBatchList_Column_Name( 'ID', 'id', 'ID')
			.SetAdvancedSearchEnabled(false)
			.SetDisplayInMenu(false)
			.SetDisplayInList(false),

			self.approved_column
		);

		if ( !self.product ) {
			columnlist.push(
				new ProductField_Column( {
					name: 'Code',
					code: 'code'
				}, 'code', 'Product:code')
				.SetSortByField( 'Product:code' ),
			);
		}

		columnlist.push(
			new MMBatchList_Column_Name( 'Product ID', 'product_id', 'Product_ID')
			.SetAdvancedSearchEnabled(false)
			.SetDisplayInMenu(false)
			.SetDisplayInList(false),
			
			new MMBatchList_Column_DateTime( 'Date', 'created', 'Created'),

			new MMBatchList_Column_Name( 'Customer ID', 'cust_id', 'Cust_ID')
			.SetAdvancedSearchEnabled(false)
			.SetDisplayInMenu(false)
			.SetDisplayInList(false),

			new MMBatchList_Column_Numeric( 'Order ID', 'order_id', 'Order_ID')
			.SetOnDisplayEdit( function( record ) { return DrawMMBatchListString_Data( record.order_id ? record.order_id : 'N/A' ); } )
			.SetUpdateOnModifiedOnly( true )
			.SetDefaultActive( false ),

			new MMBatchList_Column_Numeric( 'Rating', 'rating', 'Rating' )
			.SetOnDisplayData( function( record) { return DrawMMBatchListString_Data_NoEncoding( '&#9733;'.repeat( record.rating ) ) } ),

			new MMBatchList_Column_Name( 'Name', 'name', 'Name' ),

			new MMBatchList_Column_Name( 'Email', 'email', 'Email' ),

			new MMBatchList_Column_Name( 'Location', 'location', 'Location' ),

			self.notify_column,

			new MMBatchList_Column_Name( 'Title', 'title', 'Title'),

			new MMBatchList_Column_TextArea( 'Edit Summary', 'Summary', 'summary', 'Summary', false ),

			new MMBatchList_Column_TextArea( 'Edit Store Reply', 'Store Reply', 'store_rply', 'Store_Reply', false ),

			new MMBatchList_Column_DateTime( 'Notified', 'notified', 'notified')
			.SetDefaultActive( false )
			.SetOnDisplayEdit( function( record ) { return DrawMMBatchListDateTime_Data( record.notified ); } ),

			self.verified_column
		);
		
		if (self.additional_fields_length) {
			for ( i = 0, i_len = self.additional_fields_length; i < i_len; i++ ) {
				code_field		= 'AdditionalFields:' + self.additional_fields[ i ].code;
		
				columnlist.push(
					new AdditionalField_Column( self.additional_fields[ i ], code_field )
					.SetDefaultActive( false )
					.SetUpdateOnModifiedOnly( true )
					.SetSearchable( true )
					.SetInvalidateDataOnVisible( true )
					.SetSortByField( code_field )
				);
			}
		}

	return columnlist;
}

ProductReview_List.prototype.onCreate = function()
{
	var self = this;
	var i, i_len;
	var record;

	record = new Object();
	record.approved = self.auto_approve ? 1 : 0;
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
	record.Product = {};
	record.Product.code = self.product ? self.product.code : '';
	record.Product.id = self.product ? self.product.id : 0;
	record.product_id = self.product ? self.product.id : 0;
	record.store_rply = '';
	record.notified = 0;

	for ( i = 0, i_len = self.additional_fields_length; i < i_len; i++ ) {
		var code = 'AdditionalFields:' + self.additional_fields[ i ].code;
		record[code] = '';
	}

	return record;
}

ProductReview_List.prototype.Product_onSearch_GetFilter = function()
{
	return [ 'Product_ID:' + encodeURIComponent( this.product.id ) ];
}

ProductReview_List.prototype.onSave = function( item, callback, delegator ) {
	Product_Review_Update( item.record, callback, delegator );
}

ProductReview_List.Update_Approved = function( item, checked, callback, delegator ) {
	item.record.approved = checked ? 1 : 0;
	Product_Review_Update( item.record, callback, delegator );
}

ProductReview_List.Update_Notify = function( item, checked, callback, delegator ) {
	item.record.notify = checked ? 1 : 0;
	Product_Review_Update( item.record, callback, delegator );
}

ProductReview_List.Update_Verified = function( item, checked, callback, delegator ) {
	item.record.verified = checked ? 1 : 0;
	Product_Review_Update( item.record, callback, delegator );
}

ProductReview_List.prototype.onInsert = function( item, callback, delegator ) {
	Product_Review_Insert( item.record, callback, delegator );
}

ProductReview_List.prototype.onDelete = function( item, callback, delegator ) {
	Product_Review_Delete( item.record.id, callback, delegator );
}
