/* eslint-disable */
function Reviews_ProductLookup_Column( header_text, code, fieldname )
{
	MMBatchList_Column.call( this, header_text, code );

	this.SetSortByField( code );
	this.SetDefaultActive( true );
	this.SetFieldName( fieldname );
	this.SetHeaderAttributeList( { 'class': 'mm9_batchlist_column_header' } );
	this.SetHeaderStyleList( { 'width': '150px' } );
	this.SetOnDisplayEdit( this.onDisplayEdit );

	return this;
}

DeriveFrom( MMBatchList_Column, Reviews_ProductLookup_Column );

Reviews_ProductLookup_Column.prototype.onDisplayEdit = function( record, item )
{
	var self = this;
	var container, input, input_container, button;

	container			= newElement( 'span',	{ 'class': 'mm9_batchlist_column_popup_container' },									null, null );
	input_container		= newElement( 'span',	{ 'class': 'mm9_batchlist_column_popup_input_container' },								null, container );
	input				= newElement( 'input',	{ 'type': 'text', 'name': this.code, 'class': 'mm9_batchlist_data_col_editableinput' },	null, input_container );
	button				= new MMButton( container );

	input.placeholder	= this.header_text;
	input.value			= this.onRetrieveValue( record );
	input.onfocus		= function( event ) { input_container.className = classNameAdd( input_container, 'active' ); };
	input.onblur		= function( event ) { input_container.className = classNameRemove( input_container, 'active' ); };

	button.SetText( '' );
	button.SetImage( 'lookup' );
	button.SetClassName( 'mm9_batchlist_column_popup_button' );
	button.SetOnClickHandler( function( e ) { self.Lookup( item ); } );

	return container;
}

Reviews_ProductLookup_Column.prototype.Lookup = function( item )
{
	var self = this;
	var dialog;

	dialog		= new ProductLookup_Dialog();
	dialog.onok	= function()
	{
		var i, i_len, inputlist, divlist, selected_record;


		if ( !item.row || ( ( selected_record = dialog.SelectedProduct() ) === null ) )
		{
			return;
		}

		inputlist = item.row[ 'column_' + self.code ].getElementsByTagName( 'input' );

		for ( i = 0, i_len = inputlist.length; i < i_len; i++ )
		{
			if ( inputlist[ i ].name == self.code )
			{
				inputlist[ i ].value = selected_record.code;
			}
		}
		
		divlist = item.row[ 'column_product_name' ].getElementsByClassName( 'mm9_batchlist_data_col_div_content' );

		for ( i = 0, i_len = divlist.length; i < i_len; i++ )
		{
			divlist[ i ].innerText = selected_record.name;
		}
	};

	dialog.Show();
}
