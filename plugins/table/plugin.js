/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.add('table', {
	requires: 'dialog',
	// jscs:disable maximumLineLength
	lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
	// jscs:enable maximumLineLength
	icons: 'table', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	init: function(editor) {
		if (editor.blockless)
			return;

		var lang = editor.lang.table;

		editor.addCommand('table', new CKEDITOR.dialogCommand('table', {
			context: 'table',
			allowedContent: 'table{width,height}[align,border,cellpadding,cellspacing,summary];' +
				'caption tbody thead tfoot;' +
				'th td tr[scope];' +
				(editor.plugins.dialogadvtab ? 'table' + editor.plugins.dialogadvtab.allowedContent() : ''),
			requiredContent: 'table',
			contentTransformations: [
				['table{width}: sizeToStyle', 'table[width]: sizeToAttribute'],
				['td: splitBorderShorthand'],
				[{
					element: 'table',
					right: function(element) {
						if (element.styles) {
							var parsedStyle;
							if (element.styles.border) {
								parsedStyle = CKEDITOR.tools.style.parse.border(element.styles.border);
							} else if (CKEDITOR.env.ie && CKEDITOR.env.version === 8) {
								var styleData = element.styles;
								// Workaround for IE8 browser. It transforms CSS border shorthand property
								// to the longer one, consisting of border-top, border-right, etc. We have to check
								// if all those properties exists and have the same value (#566).
								if (styleData['border-left'] && styleData['border-left'] === styleData['border-right'] &&
									styleData['border-right'] === styleData['border-top'] &&
									styleData['border-top'] === styleData['border-bottom']) {

									parsedStyle = CKEDITOR.tools.style.parse.border(styleData['border-top']);
								}
							}
							if (parsedStyle && parsedStyle.style && parsedStyle.style === 'solid' &&
								parsedStyle.width && parseFloat(parsedStyle.width) !== 0) {
								element.attributes.border = 1;
							}
							if (element.styles['border-collapse'] == 'collapse') {
								element.attributes.cellspacing = 0;
							}
						}
					}
				}]
			]
		}));

		function createDef(def) {
			return CKEDITOR.tools.extend(def || {}, {
				contextSensitive: 1,
				refresh: function(editor, path) {
					this.setState(path.contains('table', 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
				}
			});
		}

		editor.addCommand('tableProperties', new CKEDITOR.dialogCommand('tableProperties', createDef()));
		editor.addCommand('tableDelete', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);

				if (!table)
					return;

				// If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)
				var parent = table.getParent(),
					editable = editor.editable();

				if (parent.getChildCount() == 1 && !parent.is('td', 'th') && !parent.equals(editable))
					table = parent;

				var range = editor.createRange();
				range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
				table.remove();
				range.select();
			}
		}));

		editor.ui.addButton && editor.ui.addButton('Table', {
			label: lang.toolbar,
			command: 'table',
			toolbar: 'insert,30'
		});
		// 添加工具栏上的保存按钮
		//debugger
		editor.ui.addButton && editor.ui.addButton('Formsave', {
			label: '保存',
			command: 'formsave',
			toolbar: 'selfdefined,10'
		});
		editor.addCommand('formsave', {
			exec: function(editor) {
				console.log('我就是保存的命令拉');
				setTimeout(function() {
					window.parent.postMessage({
						type: 'ybt_formsave'
					}, '*');
				}, 1500);
			}
		});
		// 添加工具栏上的保存按钮
		//debugger
		editor.ui.addButton && editor.ui.addButton('Formelsesave', {
			label: '另存为',
			command: 'formelsesave',
			toolbar: 'selfdefined,20'
		});
		editor.addCommand('formelsesave', {
			exec: function(editor) {
				console.log('我就是保存的命令拉');
				//return true;
				window.parent.postMessage({
					type: 'ybt_formelsesave'
				}, '*');
			}
		});

		CKEDITOR.dialog.add('table', this.path + 'dialogs/table.js');
		CKEDITOR.dialog.add('tableProperties', this.path + 'dialogs/table.js');

		// If the "menu" plugin is loaded, register the menu items.
		if (editor.addMenuItems) {
			editor.addMenuItems({
				table: {
					label: lang.menu,
					command: 'tableProperties',
					group: 'table',
					order: 5
				},

				tabledelete: {
					label: lang.deleteTable,
					command: 'tableDelete',
					group: 'table',
					order: 1
				},
				//qiyu 2017-2-28
				// wisedutablestyle: {
				// 	label: "标准表格居中",
				// 	command: 'wisedutablestyle',
				// 	group: 'table',
				// 	order: 1
				// },
				wiseduA4: {
					label: "A4自适应表格",
					command: 'wiseduA4',
					group: 'table',
					order: 1
				},
				wiseduFixed: {
					label: "A4固定表格",
					command: 'wiseduFixed',
					group: 'table',
					order: 1
				},
				// wiseduInner: {
				// 	label: "内嵌表格铺满",
				// 	command: 'wiseduInner',
				// 	group: 'table',
				// 	order: 1
				// },
				wiseduDeleteHeader: {
					label: "清空表格上部",
					command: 'wiseduDeleteHeader',
					group: 'table',
					order: 1
				}
			});
		}

		editor.on('doubleclick', function(evt) {
			var element = evt.data.element;

			if (element.is('table'))
				evt.data.dialog = 'tableProperties';
		});
		//qiyu 2017-2-28
		editor.addCommand('wisedutablestyle', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);

				if (!table)
					return;

				table.$.className = "wistable";
				table.$.style.width = "";
				table.$.style.marginLeft = "";
				table.$.style.marginRight = "";
				var fsttd = table.$.querySelector("td:first-child");
				// var bt = fsttd.style["border-top"];
				// if( bt.indexOf("solid") == -1 ){
				// 	fsttd.style.borderTop = bt + " solid";
				// }else
				if (fsttd.style.borderStyle.indexOf("none") > -1) {
					fsttd.style.borderStyle = fsttd.style.borderStyle.replace("none", "solid");
				}
			}
		}));

		editor.addCommand('wiseduA4', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);
				if (!table)
					return;
				table.$.className = "wistable a4";
				table.$.style.width = "";
				table.$.style.marginLeft = "";
				table.$.style.marginRight = "";
				var fsttd = table.$.querySelector("td:first-child");
				// var bt = fsttd.style["border-top"];
				// if( bt.indexOf("solid") == -1 ){
				// 	fsttd.style.borderTop = bt + " solid";
				// }else
				if (fsttd.style.borderStyle.indexOf("none") > -1) {
					fsttd.style.borderStyle = fsttd.style.borderStyle.replace("none", "solid");
				}
			}
		}));

		editor.addCommand('wiseduFixed', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);
				if (!table)
					return;
				table.$.className = "wistable wistable-fixed a4";
				table.$.style.width = "";
				table.$.style.marginLeft = "";
				table.$.style.marginRight = "";
				var fsttd = table.$.querySelector("td:first-child");
				// var bt = fsttd.style["border-top"];
				// if( bt.indexOf("solid") == -1 ){
				// 	fsttd.style.borderTop = bt + " solid";
				// }else
				if (fsttd.style.borderStyle.indexOf("none") > -1) {
					fsttd.style.borderStyle = fsttd.style.borderStyle.replace("none", "solid");
				}
			}
		}));

		editor.addCommand('wiseduInner', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);
				if (!table)
					return;
				table.$.className = "wistable inner";
				table.$.style.width = "";
				table.$.style.marginLeft = "";
				table.$.style.marginRight = "";
				table.$.border = "0"
				table.$.cellSpacing = "0"
				table.$.cellPadding = "0"
			}
		}));

		editor.addCommand('wiseduDeleteHeader', createDef({
			exec: function(editor) {
				var path = editor.elementPath(),
					table = path.contains('table', 1);
				if (!table)
					return;
				//debugger
				var preNode = table.$.previousSibling;
				if (preNode) {
					preNode.remove();
				} else {
					console.log('table元素前面没有其他元素了~')
				}
			}
		}));
		// If the "contextmenu" plugin is loaded, register the listeners.
		if (editor.contextMenu) {
			editor.contextMenu.addListener(function() {
				// menu item state is resolved on commands.
				return {
					tabledelete: CKEDITOR.TRISTATE_OFF,
					table: CKEDITOR.TRISTATE_OFF,
					wisedutablestyle: CKEDITOR.TRISTATE_OFF,
					wiseduA4: CKEDITOR.TRISTATE_OFF,
					wiseduFixed: CKEDITOR.TRISTATE_OFF,
					wiseduInner: CKEDITOR.TRISTATE_OFF,
					wiseduDeleteHeader: CKEDITOR.TRISTATE_OFF
				};
			});
		}
	}
});
