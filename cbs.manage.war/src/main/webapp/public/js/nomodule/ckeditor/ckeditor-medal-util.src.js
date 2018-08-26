var mcUtils = {
		trim : function(s) {
			var whiteSpaceRe = /^\s*|\s*$/g;
			return (s ? '' + s : '').replace(whiteSpaceRe, '');
		},
		is : function(o, t) {
			if (!t)
				return o !== undef;

			if (t == 'array' && (o.hasOwnProperty && o instanceof Array))
				return true;

			return typeof(o) == t;
		},
		makeMap : function(items, delim, map) {
			var i;

			items = items || [];
			delim = delim || ',';

			if (typeof(items) == "string")
				items = items.split(delim);

			map = map || {};

			i = items.length;
			while (i--)
				map[items[i]] = {};

			return map;
		},
		each : function(o, cb, s) {
			var n, l, undef;

			if (!o)
				return 0;

			s = s || o;

			if (o.length !== undef) {
				for (n=0, l = o.length; n < l; n++) {
					if (cb.call(s, o[n], n, o) === false)
						return 0;
				}
			} else {
				for (n in o) {
					if (o.hasOwnProperty(n)) {
						if (cb.call(s, o[n], n, o) === false)
							return 0;
					}
				}
			}

			return 1;
		},
		map : function(a, f) {
			var o = [];

			mcUtils.each(a, function(v) {
				o.push(f(v));
			});

			return o;
		},
		toArray : function(obj) {
			var out, i;

			if (obj && !obj.splice) {
				out = [];

				for (i = 0; true; i++) {
					if (obj[i])
						out[i] = obj[i];
					else
						break;
				}

				return out;
			}

			return obj;
		},
		parseJSON : function(s) {
			try {
				return eval('(' + s + ')');
			} catch (ex) {
				// Ignore
			}
		},
        serializeJSON : function(o, quote) {
            var i, v, t, name;

            quote = quote || '"';

            if (o == null)
                return 'null';

            t = typeof o;

            if (t == 'string') {
                v = '\bb\tt\nn\ff\rr\""\'\'\\\\';

                return quote + o.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g, function(a, b) {
                    // Make sure single quotes never get encoded inside double quotes for JSON compatibility
                    if (quote === '"' && a === "'")
                        return a;

                    i = v.indexOf(b);

                    if (i + 1)
                        return '\\' + v.charAt(i + 1);

                    a = b.charCodeAt().toString(16);

                    return '\\u' + '0000'.substring(a.length) + a;
                }) + quote;
            }

            if (t == 'object') {
                if (o.hasOwnProperty && o instanceof Array) {
                    for (i=0, v = '['; i<o.length; i++)
                        v += (i > 0 ? ',' : '') + this.serializeJSON(o[i], quote);

                    return v + ']';
                }

                v = '{';

                for (name in o) {
                    if (o.hasOwnProperty(name)) {
                        v += typeof o[name] != 'function' ? (v.length > 1 ? ',' + quote : quote) + name + quote +':' + this.serializeJSON(o[name], quote) : '';
                    }
                }

                return v + '}';
            }

            return '' + o;
        },
		explode : function(s, d) {
			if (!s || mcUtils.is(s, 'array')) {
				return s;
			}

			return mcUtils.map(s.split(d || ','), mcUtils.trim);
		},
		extend : function(obj, ext) {
			var i, l, name, args = arguments, value;

			for (i = 1, l = args.length; i < l; i++) {
				ext = args[i];
				for (name in ext) {
					if (ext.hasOwnProperty(name)) {
						value = ext[name];

						if (value !== undef) {
							obj[name] = value;
						}
					}
				}
			}

			return obj;
		}
};

function AudioUtils()
{
	this.rootAttributes = mcUtils.explode('id,name,width,height,style,align,class,hspace,vspace,bgcolor,type');
	this.excludedAttrs = mcUtils.makeMap(this.rootAttributes.join(','));
	this.mediaTypes = [
			      		// Type, clsid:s, mime types, codebase
			      		["Flash", "d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
			      		["ShockWave", "166b1bca-3f9c-11cf-8075-444553540000", "application/x-director", "http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0"],
			      		["WindowsMedia", "6bf52a52-394a-11d3-b153-00c04f79faa6,22d6f312-b0f6-11d0-94ab-0080c74c7e95,05589fa1-c356-11ce-bf01-00aa0055595a", "application/x-mplayer2", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"],
			      	    ["Audio", "audio", "mp3", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
			      		["QuickTime", "02bf25d5-8c17-4b23-bc80-d3488abddc6b", "video/quicktime", "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"],
			      		["RealMedia", "cfcdaa03-8be4-11cf-b84b-0020afbbccfa", "audio/x-pn-realaudio-plugin", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
			      		["Java", "8ad9c840-044e-11d1-b3e9-00805f499d93", "application/x-java-applet", "http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"],
			      		["Silverlight", "dfeaf541-f3e1-4c24-acac-99c30715084a", "application/x-silverlight-2"],
			      		["Iframe"],
			      		["Video"]
			      	];
	
	this.lookup = {};
	this.scriptRegExp = '';
	
	var item, name, _this = this;
	// Parse audio types into a lookup table
	for (var i = 0; i < this.mediaTypes.length; i++) {
		name = this.mediaTypes[i][0];

		item = {
			name : name,
			clsids : mcUtils.explode(this.mediaTypes[i][1] || ''),
			mimes : mcUtils.explode(this.mediaTypes[i][2] || ''),
			codebase : this.mediaTypes[i][3]
		};

		for (var y = 0; y < item.clsids.length; y++)
			this.lookup['clsid:' + item.clsids[y]] = item;

		for (var y = 0; y < item.mimes.length; y++)
			this.lookup[item.mimes[y]] = item;

		this.lookup['mceItem' + name] = item;
		this.lookup[name.toLowerCase()] = item;

		this.scriptRegExp += (this.scriptRegExp ? '|' : '') + name;
	}

	// Handle the audio_types setting
	mcUtils.each(("video=mp4,m4v,ogv,webm;" +
		"silverlight=xap;" +
		"flash=swf,flv;" +
		"shockwave=dcr;" +
		"quicktime=mov,qt,mpg,mp3,mpeg;" +
		"mp3=mp3;" + 
		"audio=mp3;" +
		"shockwave=dcr;" +
		"windowsmedia=avi,wmv,wm,asf,asx,wmx,wvx;" +
		"realmedia=rm,ra,ram;" +
		"java=jar"
	).split(';'), function(item) {
		var i, extensions, type;

		item = item.split(/=/);
		extensions = mcUtils.explode(item[1].toLowerCase());
		for (i = 0; i < extensions.length; i++) {
			type = _this.lookup[item[0].toLowerCase()];

			if (type)
				_this.lookup[extensions[i]] = type;
		}
	});
	this.scriptRegExp = new RegExp('write(' + this.scriptRegExp + ')\\(([^)]+)\\)');
	
	this.getType = function(value) {
		var i, values, typeItem;

		// Find type by checking the classes
		values = mcUtils.explode(value, ' ');
		for (i = 0; i < values.length; i++) {
			typeItem = _this.lookup[values[i]];

			if (typeItem)
				return typeItem;
		}
	};
	
	this.imgToObject = function(node) {

		var data, typeItem, style, replacement, object, param;

        data = node.attributes['data-mce-json'];
		if (!data)
			return;

		data = mcUtils.parseJSON(data);
		typeItem = _this.getType(node.attributes['class']);

		// Do we have a params src then we can generate object
		if (data.params.src) {
			// Create new object element

            object = new CKEDITOR.htmlParser.element("object");
            object.attributes["id"] = node.attributes['id'];
            object.attributes["width"] = node.attributes['width'];
            object.attributes["height"] = node.attributes['height'];
            object.attributes["wmode"] = "transparent";
            object.attributes["style"] = style;

			mcUtils.each(_this.rootAttributes, function(name) {
				if (data[name] && name != 'type')
					object.attributes[name] = data[name];
			});

			// Add params
			for (var name in data.params) {
                param = new CKEDITOR.htmlParser.element("param");
				var value = data.params[name];

				// Windows audio needs to use url instead of src for the audio URL
				if (name === 'src' && typeItem.name === 'WindowsMedia')
					name = 'url';

                param.attributes["name"] = name;
                param.attributes["value"] = value;
				object.children.push(param);
			}

            object.attributes["classid"] = "";//"clsid:" + typeItem.clsids[0];
            object.attributes["codebase"] = typeItem.codebase;

            embed = new CKEDITOR.htmlParser.element("embed");
            embed.attributes["id"] = node.attributes['id'];
            embed.attributes["width"] = node.attributes['width'];
            embed.attributes["height"] = node.attributes['height'];
            embed.attributes["style"] = style;
            embed.attributes["type"] = typeItem.mimes[0];

			for (var name in data.params)
				embed.attributes[name] = data.params[name];

			mcUtils.each(_this.rootAttributes, function(name) {
				if (data[name] && name != 'type')
					embed.attributes[name] = data[name];
			});

            object.children.push(embed);
			
			// Insert raw HTML
			if (data.object_html) {
                value = new CKEDITOR.htmlParser.element("<#text>");
				value.raw = true;
				value.value = data.object_html;
				object.children.push(value);
			}
		}

		return object;
	};

	this.objectToImg = function(node) {

		var object, data, embed, name, img, width, height, id, html, type, style, param, attrs, _this = this;

		// Setup data objects
		data = data || {
			video : {},
			params : {}
		};

		// Setup new image object
        var tempUrl = "http://www.l99.com/js/editor/jscripts/ckeditor/skins/moono/trans.gif";
        img = new CKEDITOR.htmlParser.element("img");
        img.attributes["src"] = tempUrl;

		// Object element

		if(node.name === 'object'){
			object = node;
			for(var i = 0; i < object.children.length; i++){
				var child = object.children[i];
				if(child.name === 'embed'){
					embed = child;
					break;
				}
			}
		}

		if (object) {
			// Get width/height
			width = width || object.attributes['width'];
			height = height || object.attributes['height'];
			style = style || object.attributes['style'];
			id = id || object.attributes['id'];

			for(var i = 0; i < object.children.length; i++){
				var child = object.children[i];
				if(child.name === 'param'){
					name = child.attributes['name'];
					if(!_this.excludedAttrs[name])
						data.params[name] = child.attributes['value'];
					child.remove();
                    i--;
				}
			}

			data.params.src = data.params.src || object.attributes['data'];
		}

		if (embed) {
			// Get width/height
			width = width || embed.attributes['width'];
			height = height || embed.attributes['height'];
			style = style || embed.attributes['style'];
			id = id || embed.attributes['id'];
           	
           	for(var name in embed.attributes){
           		if (!_this.excludedAttrs[name] && !data.params[name])
                    data.params[name] = embed.attributes[name];
           	}
		}

		// Use src not movie
		if (data.params.movie) {
			data.params.src = data.params.src || data.params.movie;
			delete data.params.movie;
		}

		if(object && !type)
			type = (_this.lookup[(object.attributes['clsid'] || '').toLowerCase()] || _this.lookup[(object.attributes['type'] || '').toLowerCase()] || {}).name;

		if (embed && !type)
			type = (_this.lookup[(embed.attributes['type'] || '').toLowerCase()] || {}).name;

		// Remove embed
		if (embed)
			embed.remove();

		// Serialize the inner HTML of the object element
		if (object) {
			
			var writer = new CKEDITOR.htmlParser.basicWriter();
			object.writeHtml(writer);
			var htmlStr = writer.getHtml();
			html= $(htmlStr)[0].innerHTML;

			if (html)
				data.object_html = html;
		}

		// Set width/height of placeholder
		img.attributes["id"] = id;
		img.attributes["class"] = 'mceItemMedia mceItem' + (type || 'Flash');
		img.attributes["style"] = style;
		img.attributes["width"] = width || "320";
		img.attributes["height"] = height || "240";
		img.attributes["data-mce-json"] = mcUtils.serializeJSON(data, "'");

        return img;
	};
};

function VideoUtils()
{
	this.rootAttributes = mcUtils.explode('id,name,width,height,style,align,class,hspace,vspace,bgcolor,type');
	this.excludedAttrs = mcUtils.makeMap(this.rootAttributes.join(',')), 
	this.mediaTypes = [
		// Type, clsid:s, mime types, codebase
		["Flash", "d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
		["ShockWave", "166b1bca-3f9c-11cf-8075-444553540000", "application/x-director", "http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0"],
		["FlashVideo", "flashvideo", "flv", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
		["Audio", "D27CDB6E-AE6D-11cf-96B8-444553540000", "mp3", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],		
		["WindowsMedia", "6bf52a52-394a-11d3-b153-00c04f79faa6,22d6f312-b0f6-11d0-94ab-0080c74c7e95,05589fa1-c356-11ce-bf01-00aa0055595a", "application/x-mplayer2", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"],
		["QuickTime", "02bf25d5-8c17-4b23-bc80-d3488abddc6b", "video/quicktime", "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"],
		["RealMedia", "cfcdaa03-8be4-11cf-b84b-0020afbbccfa", "audio/x-pn-realaudio-plugin", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
		["Java", "8ad9c840-044e-11d1-b3e9-00805f499d93", "application/x-java-applet", "http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"],
		["Silverlight", "dfeaf541-f3e1-4c24-acac-99c30715084a", "application/x-silverlight-2"],
		["Iframe"],
		["Video"]
	];
	this.scriptRegExp = "";
	this.lookup = {};
	
	var item, name, _this = this;
	// Parse media types into a lookup table
	for (var i = 0; i < this.mediaTypes.length; i++) {
		name = this.mediaTypes[i][0];

		item = {
			name : name,
			clsids : mcUtils.explode(this.mediaTypes[i][1] || ''),
			mimes : mcUtils.explode(this.mediaTypes[i][2] || ''),
			codebase : this.mediaTypes[i][3]
		};

		for (var y = 0; y < item.clsids.length; y++)
			this.lookup['clsid:' + item.clsids[y]] = item;

		for (var y = 0; y < item.mimes.length; y++)
			this.lookup[item.mimes[y]] = item;

		this.lookup['mceItem' + name] = item;
		this.lookup[name.toLowerCase()] = item;

		this.scriptRegExp += (this.scriptRegExp ? '|' : '') + name;
	}

	// Handle the media_types setting
	mcUtils.each(("video=mp4,m4v,ogv,webm;" +
		"silverlight=xap;" +
		"flash=swf,flv;" +
		"shockwave=dcr;" +
		"quicktime=mov,qt,mpg,mp3,mpeg;" +
		"audio=mp3;"+
		"flashvideo=flv,swf;" + 
		"shockwave=dcr;" +
		"windowsmedia=avi,wmv,wm,asf,asx,wmx,wvx;" +
		"realmedia=rm,ra,ram;" +
		"java=jar"
	).split(';'), function(item) {
		var i, extensions, type;

		item = item.split(/=/);
		extensions = mcUtils.explode(item[1].toLowerCase());
		for (i = 0; i < extensions.length; i++) {
			type = _this.lookup[item[0].toLowerCase()];

			if (type)
				_this.lookup[extensions[i]] = type;
		}
	});

	this.scriptRegExp = new RegExp('write(' + this.scriptRegExp + ')\\(([^)]+)\\)');

	this.getType = function(value) {
		var i, values, typeItem;

		// Find type by checking the classes
		values = mcUtils.explode(value, ' ');
		for (i = 0; i < values.length; i++) {
			typeItem = _this.lookup[values[i]];

			if (typeItem)
				return typeItem;
		}
	};
	
	this.imgToObject = function(node) {

		var data, typeItem, style, object, param, embed;

		data = node.attributes['data-mce-json'];
		if (!data)
			return;

		data = mcUtils.parseJSON(data);
		typeItem = _this.getType(node.attributes['class']);

		// Handle iframe
		if (typeItem.name === 'Iframe') {
			replacement = new CKEDITOR.htmlParser.element("iframe");

			mcUtils.each(_this.rootAttributes, function(name) {
				var value = node.attributes[name];

				if (name == 'class' && value)
					value = value.replace(/mceItem.+ ?/g, '');

				if (value && value.length > 0)
					replacement.attributes[name] = value;
			});

			for (var name in data.params)
				replacement.attributes[name] = data.params[name];

            replacement.attributes["style"] = style;
            replacement.attributes["src"] = data.params.src;

			return replacement;
		}

		// Do we have a params src then we can generate object
		if (data.params.src) {

			// Create new object element
            object = new CKEDITOR.htmlParser.element("object");
            object.attributes["id"] = node.attributes['id'];
            object.attributes["width"] = node.attributes['width'];
            object.attributes["height"] = node.attributes['height'];
            object.attributes["wmode"] = "transparent";
            object.attributes["style"] = style;

			mcUtils.each(_this.rootAttributes, function(name) {
				if (data[name] && name != 'type')
					object.attributes[name] = data[name];
			});

			// Add params
			for (var name in data.params) {
                param = new CKEDITOR.htmlParser.element("param");
				value = data.params[name];

				// Windows media needs to use url instead of src for the media URL
				if (name === 'src' && typeItem.name === 'WindowsMedia')
					name = 'url';

                param.attributes["name"] = name;
                param.attributes["value"] = value;
                object.children.push(param);
			}

            object.attributes["classid"] = "";
            object.attributes["codebase"] = typeItem.codebase;

            embed = new CKEDITOR.htmlParser.element("embed");
            embed.attributes["id"] = node.attributes['id'];
            embed.attributes["width"] = node.attributes['width'];
            embed.attributes["height"] = node.attributes['height'];
            embed.attributes["wmode"] = "transparent";
            embed.attributes["style"] = style;
            embed.attributes["type"] = typeItem.mimes[0];

			for (name in data.params)
				embed.attributes[name] = data.params[name];

			mcUtils.each(_this.rootAttributes, function(name) {
				if (data[name] && name != 'type')
					embed.attributes[name] = data[name];
			});

			object.children.push(embed);
			
			// Insert raw HTML
			if (data.object_html) {
                value = new CKEDITOR.htmlParser.element("<#text>");
                value.raw = true;
                value.value = data.object_html;
                object.children.push(value);
			}
		}

		return object;
	};
	
		this.objectToImg = function(node) {

		var object, data, embed, name, img, width, height, id, html, type, style, param, attrs, _this = this;

		// Setup data objects
		data = data || {
			video : {},
			params : {}
		};

		// Setup new image object
		var tempUrl = "http://www.l99.com/js/editor/jscripts/ckeditor/skins/moono/trans.gif";
        img = new CKEDITOR.htmlParser.element("img");
        img.attributes["src"] = tempUrl;

		// Object element

		if(node.name === 'object'){
			object = node;
			for(var i = 0; i < object.children.length; i++){
				var child = object.children[i];
				if(child.name === 'embed'){
					embed = child;
					break;
				}
			}
		}

		if (object) {
			// Get width/height
			width = width || object.attributes['width'];
			height = height || object.attributes['height'];
			style = style || object.attributes['style'];
			id = id || object.attributes['id'];

			for(var i = 0; i < object.children.length; i++){
				var child = object.children[i];
				if(child.name === 'param'){
					name = child.attributes['name'];
					if(!_this.excludedAttrs[name])
						data.params[name] = child.attributes['value'];
					child.remove();
                    i--;
				}
			}

			data.params.src = data.params.src || object.attributes['data'];
		}

		if (embed) {
			// Get width/height
			width = width || embed.attributes['width'];
			height = height || embed.attributes['height'];
			style = style || embed.attributes['style'];
			id = id || embed.attributes['id'];
           	
           	for(var name in embed.attributes){
           		if (!_this.excludedAttrs[name] && !data.params[name])
                    data.params[name] = embed.attributes[name];
           	}
		}

		// Use src not movie
		if (data.params.movie) {
			data.params.src = data.params.src || data.params.movie;
			delete data.params.movie;
		}

		if(object && !type)
			type = (_this.lookup[(object.attributes['clsid'] || '').toLowerCase()] || _this.lookup[(object.attributes['type'] || '').toLowerCase()] || {}).name;

		if (embed && !type)
			type = (_this.lookup[(embed.attributes['type'] || '').toLowerCase()] || {}).name;

		// Remove embed
		if (embed)
			embed.remove();

		// Serialize the inner HTML of the object element
		if (object) {
			
			var writer = new CKEDITOR.htmlParser.basicWriter();
			object.writeHtml(writer);
			var htmlStr = writer.getHtml();
			html= $(htmlStr)[0].innerHTML;

			if (html)
				data.object_html = html;
		}

		// Set width/height of placeholder
		img.attributes["id"] = id;
		img.attributes["class"] = 'mceItemMedia mceItem' + (type || 'Flash');
		img.attributes["style"] = style;
		img.attributes["width"] = width || "320";
		img.attributes["height"] = height || "240";
		img.attributes["data-mce-json"] = mcUtils.serializeJSON(data, "'");

        return img;
	};
};
