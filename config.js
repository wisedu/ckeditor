/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	config.language = 'zh-cn';
	// config.toolbar= [
	// 	{ name: 'document', items: [ 'Print' ] },
	// 	{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
	// 	{ name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
	// 	{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
	// 	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	// 	{ name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
	// 	{ name: 'links', items: [ 'Link', 'Unlink' ] },
	// 	{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
	// 	{ name: 'insert', items: [ 'Image', 'Table' ] },
	// 	{ name: 'tools', items: [ 'Maximize' ] },
	// 	{ name: 'editing', items: [ 'Scayt' ] }
	// ];
	config.plugins =
		//'about,' +
		'a11yhelp,' +
		'basicstyles,' +
		'bidi,' +
		//'blockquote,' +
		//'clipboard,' +
		'colorbutton,' +
		'colordialog,' +
		'copyformatting,' +
		'contextmenu,' +
		'dialogadvtab,' +
		//'div,' +
		'elementspath,' +
		'enterkey,' +
		'entities,' +
		'filebrowser,' +
		//'find,' +
		//'flash,' +
		'floatingspace,' +
		'font,' +
		'format,' +
		//'forms,' +
		'horizontalrule,' +
		'htmlwriter,' +
		'image,' +
		//'iframe,' +
		'indentlist,' +
		'indentblock,' +
		'justify,' +
		//'language,' +
		'link,' +
		'list,' +
		'liststyle,' +
		// 'magicline,' +
		//'maximize,' +
		'newpage,' +
		'pagebreak,' +
		'pastefromword,' +
		//'pastetext,' +
		//'preview,' +
		'print,' +
		//'removeformat,' +
		'resize,' +
		//'save,' +
		//'selectall,' +
		//'showblocks,' +
		'showborders,' +
		'smiley,' +
		'sourcearea,' +
		'specialchar,' +
		'stylescombo,' +
		//'tab,' +
		'table,' +
		'tableselection,' +
		'tabletools,' +
		//'templates,' +
		'toolbar,' +
		'undo,' +
		'uploadimage,' +
		'wysiwygarea';
	config.extraPlugins = 'padding,tableresize,uploadimage';
	config.fontSize_sizes = '小五/9pt;五/10.5pt;小四/12pt;四/14pt;小三/15pt;三/16pt;小二/18pt;二/22pt;小一/24pt;一/26pt;小初/36pt;初/42pt;5/5pt;5.5/5.5pt;6.5/6.5pt;7.5/7.5pt;8/8pt;9/9pt;10/10pt;10.5/10.5pt;11/11pt;12/12pt;14/14pt;16/16pt;18/18pt;20/20pt;22/22pt;24/24pt;26/26pt;28/28pt;36/36px;48/48px;72/72px';
	config.font_names = '宋体/SimSun;' +
	'仿宋_GB2312/FangSong_GB2312;' +
	'华文宋体/STSong;' +
	'微软雅黑/Microsoft YaHei;' +
	'方正美黑简体/FZMeiHei-M07S;' +
	'方正小标宋简体/FZXiaoBiaoSong-B05S;' +
	'幼圆/YouYuan;' +
	'黑体/SimHei;' +
	'楷体/KaiTi;' +
	'楷体_GB2312/KaiTi_GB2312;' +
	'Verdana/Verdana, Geneva, sans-serif';
	// %REMOVE_END%
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
