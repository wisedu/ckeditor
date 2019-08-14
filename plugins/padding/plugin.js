/*
 Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'padding',{
	requires: 'dialog',
	// lang : 'en,pl', // %REMOVE_LINE_CORE%
	icons: 'insertpre', // %REMOVE_LINE_CORE%
	onLoad : function()
	{
	},
	init : function( editor )
	{
		// allowed and required content is the same for this plugin
		// var required = CKEDITOR.config.insertpre_class ? ( 'pre( ' + CKEDITOR.config.insertpre_class + ' )' ) : 'pre';
		// editor.addCommand( 'padding', new CKEDITOR.dialogCommand( 'padding', {
		// 	allowedContent : required,
		// 	requiredContent : required
		// } ) );
		// editor.ui.addButton && editor.ui.addButton( 'Oadding',
		// 	{
		// 		label : "设置页面边距",
		// 		icon : this.path + 'icons/insertpre.png',
		// 		command : 'padding',
		// 		toolbar: 'insert,99'
		// 	} );


		// CKEDITOR.dialog.add( 'padding', function( editor )
		// {
		// 	return {
		// 		title : "设置页面边距",
		// 		minWidth : 200,
		// 		minHeight : 150,
		// 		contents : [
		// 			{
		// 				id : 'general',
		// 				label : "边距",
		// 				elements : [
		// 					{
		// 						type : 'text',
		// 						id : 'left',
		// 						label : "边距[上下 右左] / [上 右 下 左]（单位 cm / mm）",
		// 						cols: 10,
		// 						validate : CKEDITOR.dialog.validate.notEmpty( "不能为空" ),
		// 						required : true,
		// 						setup : function( element )
		// 						{
		// 							this.setValue( element.style.padding );
		// 						},
		// 						commit : function( element )
		// 						{
		// 							element.style.padding = this.getValue();
		// 						}
		// 					},
		// 					// {
		// 					// 	type : 'text',
		// 					// 	id : 'right',
		// 					// 	label : "右边距（单位 cm / mm）",
		// 					// 	cols: 10,
		// 					// 	validate : CKEDITOR.dialog.validate.notEmpty( "不能为空" ),
		// 					// 	required : true,
		// 					// 	setup : function( element )
		// 					// 	{
		// 					// 		this.setValue( element.style.paddingRight );
		// 					// 	},
		// 					// 	commit : function( element )
		// 					// 	{
		// 					// 		element.style.paddingRight = this.getValue();
		// 					// 	}
		// 					// }
		// 				]
		// 			}
		// 		],
		// 		onShow : function()
		// 		{
		// 			var element = editor.document.getBody().$;
		// 			// var sel = editor.getSelection(),
		// 			// 	element = sel.getStartElement();
		// 			// if ( element )
		// 			// 	element = element.getAscendant( 'pre', true );

		// 			// if ( !element || element.getName() != 'pre' || !element.hasClass( editor.config.insertpre_class ) )
		// 			// {
		// 			// 	element = editor.document.createElement( 'pre' );
		// 			// 	this.insertMode = true;
		// 			// }
		// 			// else
		// 			// 	this.insertMode = false;

		// 			// this.pre = element;
		// 			this.setupContent( element );
		// 		},
		// 		onOk : function()
		// 		{
		// 			var element = editor.document.getBody().$;
		// 			// if ( editor.config.insertpre_class )
		// 			// 	this.pre.setAttribute( 'class', editor.config.insertpre_class );

		// 			// if ( this.insertMode )
		// 			// 	editor.insertElement( this.pre );

		// 			this.commitContent( element );
		// 		}
		// 	};
		// } );
	}
} );
