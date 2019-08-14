/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( function() {

	function setupAdvParams( element ) {
		var attrName = this.att;

		var value = element && element.hasAttribute( attrName ) && element.getAttribute( attrName ) || '';

		if ( value !== undefined )
			this.setValue( value );
	}

	function commitAdvParams() {
		// Dialogs may use different parameters in the commit list, so, by
		// definition, we take the first CKEDITOR.dom.element available.
		var element;
		//debugger
		for ( var i = 0; i < arguments.length; i++ ) {
			if ( arguments[ i ] instanceof CKEDITOR.dom.element ) {
				element = arguments[ i ];
				break;
			}
		}

		if ( element ) {
			var attrName = this.att,
				value = this.getValue();
			// if(attrName === 'border-topbottom'){
			// 	if(Number(value)){
			// 		element.$.style.setProperty( 'border-top-style', 'solid' );
			// 		element.$.style.setProperty( 'border-bottom-style', 'solid' );
			// 		element.$.style.setProperty( 'border-left-style', 'none' );
			// 		element.$.style.setProperty( 'border-right-style', 'none' );
			// 	}
			// }
			if(attrName === 'border-style'){
				if(value){
					if(isNaN(value)){
						element.$.style.setProperty( 'border-style', value );
					}else {
						element.$.style.setProperty( 'border-width', value + 'px' );
						element.$.style.setProperty( 'border-style', 'solid' );
					}
				}
			}
			if ( value ){
				element.setAttribute( attrName, value );
			}else {
				element.removeAttribute( attrName, value );
			}
				
		}
	}

	function setBorderColor() {

	}

	var defaultTabConfig = { id: 1, dir: 1, classes: 1, styles: 1 , bhBorderColor: 1, bhBorderStyle: 1};

	CKEDITOR.plugins.add( 'dialogadvtab', {
		requires: 'dialog',

		// Returns allowed content rule for the content created by this plugin.
		allowedContent: function( tabConfig ) {
			if ( !tabConfig )
				tabConfig = defaultTabConfig;

			var allowedAttrs = [];
			if ( tabConfig.id )
				allowedAttrs.push( 'id' );
			if ( tabConfig.dir )
				allowedAttrs.push( 'dir' );

			var allowed = '';

			if ( allowedAttrs.length )
				allowed += '[' + allowedAttrs.join( ',' ) +  ']';

			if ( tabConfig.classes )
				allowed += '(*)';
			if ( tabConfig.styles )
				allowed += '{*}';

			return allowed;
		},

		// @param tabConfig
		// id, dir, classes, styles
		createAdvancedTab: function( editor, tabConfig, element ) {
			if ( !tabConfig )
				tabConfig = defaultTabConfig;

			var lang = editor.lang.common;

			var result = {
				id: 'advanced',
				label: lang.advancedTab,
				title: lang.advancedTab,
				elements: [ {
					type: 'vbox',
					padding: 1,
					children: []
				} ]
			};

			var contents = [];

			if ( tabConfig.id || tabConfig.dir ) {
				// if ( tabConfig.id ) {
				// 	contents.push( {
				// 		id: 'advId',
				// 		att: 'id',
				// 		type: 'text',
				// 		requiredContent: element ? element + '[id]' : null,
				// 		label: lang.id,
				// 		setup: setupAdvParams,
				// 		commit: commitAdvParams
				// 	} );
				// }

				// if ( tabConfig.dir ) {
				// 	contents.push( {
				// 		id: 'advLangDir',
				// 		att: 'dir',
				// 		type: 'select',
				// 		requiredContent: element ? element + '[dir]' : null,
				// 		label: lang.langDir,
				// 		'default': '',
				// 		style: 'width:100%',
				// 		items: [
				// 			[ lang.notSet, '' ],
				// 			[ lang.langDirLTR, 'ltr' ],
				// 			[ lang.langDirRTL, 'rtl' ]
				// 		],
				// 		setup: setupAdvParams,
				// 		commit: commitAdvParams
				// 	} );
				// }

				result.elements[ 0 ].children.push( {
					type: 'hbox',
					widths: [ '50%', '50%' ],
					children: [].concat( contents )
				} );
			}

			if ( tabConfig.styles || tabConfig.classes ) {
				contents = [];

				if ( tabConfig.styles ) {
					contents.push( {
						id: 'advStyles',
						att: 'style',
						type: 'text',
						requiredContent: element ? element + '{cke-xyz}' : null,
						label: lang.styles,
						'default': '',

						validate: CKEDITOR.dialog.validate.inlineStyle( lang.invalidInlineStyle ),
						onChange: function() {},

						getStyle: function( name, defaultValue ) {
							var match = this.getValue().match( new RegExp( '(?:^|;)\\s*' + name + '\\s*:\\s*([^;]*)', 'i' ) );
							return match ? match[ 1 ] : defaultValue;
						},

						updateStyle: function( name, value ) {
							var styles = this.getValue();

							var tmp = editor.document.createElement( 'span' );
							tmp.setAttribute( 'style', styles );
							tmp.setStyle( name, value );
							styles = CKEDITOR.tools.normalizeCssText( tmp.getAttribute( 'style' ) );

							this.setValue( styles, 1 );
						},

						setup: setupAdvParams,

						commit: commitAdvParams

					} );
				}

				if ( tabConfig.classes ) {
					contents.push( {
						type: 'hbox',
						widths: [ '45%', '55%' ],
						children: [ {
							id: 'advCSSClasses',
							att: 'class',
							type: 'text',
							requiredContent: element ? element + '(cke-xyz)' : null,
							label: lang.cssClasses,
							'default': '',
							setup: setupAdvParams,
							commit: commitAdvParams

						} ]
					} );
				}

				result.elements[ 0 ].children.push( {
					type: 'hbox',
					widths: [ '50%', '50%' ],
					children: [].concat( contents )
				} );
			}

			/**
			 * 添加边框颜色选择
			 */
			if ( tabConfig.bhBorderColor || tabConfig.bhBorderClass ) {
				contents = [];

				if ( tabConfig.bhBorderColor ) {
					contents.push( {
						id: 'bhBorderColor',
						att: 'border-color',
						type: 'select',
						requiredContent: element ? element + '[dir]' : null,
						label: '常用边框颜色',
						'default': '',
						style: 'width:100%',
						items: [
							[ '无颜色', '' ],
							[ '黑色', 'black' ],
							[ '红色', 'red' ],
							[ '蓝色', 'blue' ]
						],
						setup: setupAdvParams,
						commit: commitAdvParams,
						//改变选项后,更改自定义输入框的内容,已达到同步修改的问题
						onChange: function (_res) {
							var color = _res.data.value;
							if(color){
								this.getDialog().getContentElement( 'advanced', 'borderColor' ).setValue( color );
							}
						}
					} );
				}

				/**
				 * 添加边框样式选择
				 */
				if ( tabConfig.bhBorderStyle ) {
					contents.push( {
						id: 'bhBorderStyle',
						att: 'border-style',
						type: 'select',
						requiredContent: element ? element + '[dir]' : null,
						label: '边框样式类',
						'default': '',
						style: 'width:100%',
						items: [
							[ '默认', '' ],
							[ '1像素边框', '1' ],
							[ '2像素边框', '2' ],
							[ '无边框', 'none' ],
							['只有上下边框','solid none']
						],
						setup: setupAdvParams,
						commit: commitAdvParams
					} );
					// contents.push( {
					// 	id: 'bhBorderStyleTopBottom',
					// 	att: 'border-topbottom',
					// 	type: 'text',
					// 	requiredContent: element ? element + '[dir]' : null,
					// 	label: '只有上下边框',
					// 	'default': '',
					// 	style: ';width:100%',
					// 	setup: setupAdvParams,
					// 	commit: commitAdvParams
					// } );
				}

				result.elements[ 0 ].children.push( {
					type: 'hbox',
					widths: [ '50%', '50%' ],
					children: [].concat( contents )
				} );


				contents = [];
				contents.push({
					type: 'hbox',
					padding: 0,
					widths: [ '50%', '50%' ],
					children: [ {
						type: 'text',
						id: 'borderColor',
						label: '自定义边框颜色',
						'default': '',
						setup: function( element ) {
							var	borderColorStyle = element.getStyle( 'border-color' );
							this.getDialog().getContentElement( 'advanced', 'borderColor' ).setValue( borderColorStyle );
						} ,
						commit: function( selectedCell ) {
							var value = this.getValue();
							var element;

							for ( var i = 0; i < arguments.length; i++ ) {
								if ( arguments[ i ] instanceof CKEDITOR.dom.element ) {
									element = arguments[ i ];
									break;
								}
							}

							if ( element ) {
								if ( value )
									element.setStyle( 'border-color', value );
								else
									element.removeStyle( 'border-color' );
							}
						}
					},

						{
							type: 'button',
							id: 'borderColorChoose',
							'class': 'colorChooser', // jshint ignore:line
							label: '选择颜色',
							style: 'margin-top: 22px',
							onClick: function() {
								editor.getColorFromDialog( function( color ) {
									if ( color )
										this.getDialog().getContentElement( 'advanced', 'borderColor' ).setValue( color );
								}, this );
							}
						}
					]
				});

				result.elements[ 0 ].children.push( {
					type: 'hbox',
					widths: [ '50%', '50%' ],
					children: [].concat( contents )
				} );
			}

			return result;
		}
	} );

} )();
