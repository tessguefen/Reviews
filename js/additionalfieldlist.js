/* eslint-disable */
function AdditionalField_List()
{
	MMBatchList.call( this, 'batchlist_additionalfields' );

	this.Feature_SearchBar_SetPlaceholderText( 'Search Additional Fields...' );
	this.SetDefaultSort( 'id', '' );

	if ( CanI( 'SYSM', 0, 1, 0, 0 ) )
	{
		this.Feature_Add_Enable( 'Add Additional Field' );
	}

	if ( CanI( 'SYSM', 0, 0, 1, 0 ) )
	{
		this.Feature_Edit_Enable( 'Edit Additional Field(s)' );;
		this.Feature_RowDoubleClick_Enable();
	}

	if ( CanI( 'SYSM', 0, 0, 0, 1 ) )
	{
		this.Feature_Delete_Enable( 'Delete Additional Field(s)' );
	}
}

DeriveFrom( MMBatchList, AdditionalField_List );

AdditionalField_List.prototype.onLoad = AdditionalFields_Load_Query;

AdditionalField_List.prototype.onCreateRootColumnList = function()
{
	var columnlist =
	[
		new MMBatchList_Column_Name( 'Data ID', 'id', 'ID')
		.SetAdvancedSearchEnabled(false)
		.SetDisplayInMenu(false)
		.SetDisplayInList(false)
		.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Code( 'Code', 'code', 'Code'),
		new MMBatchList_Column_Name( 'Name', 'name', 'Name')
	];

	return columnlist;
}

AdditionalField_List.prototype.onCreate = function()
{
	var record;

	record = new Object();
	record.id = 0;
	record.code = '';
	record.name = '';

	return record;
}

AdditionalField_List.prototype.onSave = function( item, callback, delegator ) {
	AdditionalField_Update( item.record, callback, delegator );
}

AdditionalField_List.prototype.onInsert = function( item, callback, delegator ) {
	AdditionalField_Insert( item.record, callback, delegator );
}

AdditionalField_List.prototype.onDelete = function( item, callback, delegator ) {
	AdditionalField_Delete( item.record, callback, delegator );
}
