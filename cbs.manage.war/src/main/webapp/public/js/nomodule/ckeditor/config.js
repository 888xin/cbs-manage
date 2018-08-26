/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

var CKEDITOR_DIALOG_NAME_LIST = {
		imageUploadDialog : 'imageUploadDialog',
		emotionsDialog : 'emotionsDialog',
		audioDialog : 'audioDialog',
		videoDialog : 'videoDialog'
};

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.width = 688; 
	config.height = 318; 
	config.toolbarLocation = 'top';//display toolbar at the bottom
	config.resize_enabled = false;//disable resize
	config.removePlugins = 'elementspath,image,forms,liststyle,tabletools,scayt,menubutton,contextmenu';//remove elements at the status bar
	config.linkShowAdvancedTab = false;//disable link tabs
	config.linkShowTargetTab = false;//disable link tabs
	config.startupFocus = true;//auto focus
	config.dialog_backgroundCoverOpacity = '0';//set dialog's opacity
	config.fontSize_sizes ='12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px;';
	config.toolbar = [
	                	{ name: 'insert', items: [ 'LifeixImageUpload', 'emotions',
	                						  '-', 'FontSize', 
	                						  '-', 'Bold', 'Italic', 'Underline', 'TextColor', 
	                						  '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'BulletedList', 'NumberedList', 
	                						  '-', 'Link', 'Unlink', 
	                						  '-', 'Undo', 'Redo', 
	                						  '-', 'RemoveFormat'] }
	          	];
	config.extraPlugins="LifeixImageUpload,emotions,video,audio,autogrow";
	config.autoGrow_minHeight = 318;
	config.autoGrow_bottomSpace = 20;
	config.allowedContent = "a b blockquote br cite code dd dl dt em i li ol p q small strike strong sub sup u ul img span div embed object param table thead tbody tfoot td th tr em h2 h3 h4 h5 h6[style, data-id, data-width, data-height, target](act_redove, mini_content, mini_img, mini_more){font,font-size,line-height,text-align,color,border,border-bottom,border-bottom-color,border-bottom-style,border-bottom-width,border-collapse,border-color,border-left,border-left-color,border-left-style,border-left-width,border-right,border-right-color,border-right-style,border-right-width,border-style,border-top,border-top-color,border-top-style,border-top-width,border-width,float,clear,margin,margin-bottom,margin-left,margin-right,margin-top,padding,padding-bottom,padding-left,padding-right,padding-top,table-layout,display,visibility,list-style,list-style-image,list-style-position,list-style-type,left,right,top,bottom,overflow,overflow-x,overflow-y};a[href, title, rel];blockquote[cite];q[cite];img[align, alt, height, src, title, width, data-mce-json, id](mceItemMedia, mceItemAudio, mceItemFlash);span[title];p[title, align];object[classid, width, height, codebase, wmode];embed[type, width, height, src, wmode, flashvars, quality, object_html, movie];param[name, value];table[width, border, height, bgcolor, align, cellspacing];tr[bgcolor];td[width, bgcolor, height, colspan, rowspan, valign];div[*](*){lifeix_video};img[*](*){lifeix_video_snapshot};img[*](*){lifeix_play}";
	if(window.mediaDisableMode){
		config.toolbar = [
		                	{ name: 'insert', items: [ 'LifeixImageUpload', 'emotions', 
		                						  '-', 'FontSize', 
		                						  '-', 'Bold', 'Italic', 'Underline', 'TextColor', 
		                						  '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'BulletedList', 'NumberedList', 
		                						  '-', 'Link', 'Unlink', 
		                						  '-', 'Undo', 'Redo', 
		                						  '-', 'RemoveFormat'] }
		          	];
		config.extraPlugins="LifeixImageUpload,emotions,autogrow";
		config.allowedContent = "a b blockquote br cite code dd dl dt em i li ol p q small strike strong sub sup u ul img span div table thead tbody tfoot td th tr em h2 h3 h4 h5 h6[style, data-id, data-width, data-height, target](act_redove, mini_content, mini_img, mini_more){font,font-size,line-height,text-align,color,border,border-bottom,border-bottom-color,border-bottom-style,border-bottom-width,border-collapse,border-color,border-left,border-left-color,border-left-style,border-left-width,border-right,border-right-color,border-right-style,border-right-width,border-style,border-top,border-top-color,border-top-style,border-top-width,border-width,float,clear,margin,margin-bottom,margin-left,margin-right,margin-top,padding,padding-bottom,padding-left,padding-right,padding-top,table-layout,display,visibility,list-style,list-style-image,list-style-position,list-style-type,left,right,top,bottom,overflow,overflow-x,overflow-y};a[href, title, rel];blockquote[cite];q[cite];img[align, alt, height, src, title, width];span[title];p[title, align];table[width, border, height, bgcolor, align, cellspacing];tr[bgcolor];td[width, bgcolor, height, colspan, rowspan, valign]";		
	} 
    //right-click menu item 
	//config.menu_groups = "link";
};

CKEDITOR.on( 'instanceReady', function( ev ){
	
	//paste filter font color to adjust different templets
	ev.editor.on('paste', function (e) {
        e.data.dataValue = e.data.dataValue.replace(/color:\s?[^;]*;/gi, '');
    });
	
	var textProcessingMask = document.getElementById("text_processing_mask");
	if(textProcessingMask){
		textProcessingMask.style.display = 'none';
		ev.editor.fire('contentDom');
	}
	
	var editor = ev.editor,
		dataProcessor = editor.dataProcessor,
		htmlFilter = dataProcessor && dataProcessor.htmlFilter;
	
	dataProcessor.writer.setRules( 'p', {				               
        breakAfterClose: false
    });
	// Out self closing tags the HTML4 way, like <br>.
	dataProcessor.writer.selfClosingEnd = '>';
	if(!window.reblogMode){
		htmlFilter.addRules( {
			elements: {
				'img': function( element ) {
					// Converts a ckeditor image element to video/object/embed.
					if ( element.attributes["class"] != undefined && element.attributes["class"].indexOf("mceItemFlash") > -1) {
	                    var videoObjNode = new VideoUtils().imgToObject(element);
	                    if(videoObjNode)
	                        return videoObjNode;
	                    else{
	                        element.remove();
	                        return null;
	                    }
					}
					// Converts a ckeditor image element to audio/object/embed.
					if ( element.attributes["class"] != undefined && element.attributes["class"].indexOf("mceItemAudio") > -1) {
	                    var audioObjNode = new AudioUtils().imgToObject(element);
	                    if(audioObjNode)
	                        return audioObjNode;
	                    else{
	                        element.remove();
	                        return null;
	                    }
					}
					return element;
				}
			}
		});
	}
});

CKEDITOR.on('dialogDefinition', function (e) {
    var dialogName = e.data.name;
    var dialog = e.data.definition.dialog;
    //refresh the iframe content
    dialog.on('hide', function () {
	    if(dialogName == CKEDITOR_DIALOG_NAME_LIST.audioDialog)
	    {
	    	var insertAudioIfr = document.getElementById("cke_insertAudio_ifr");
            insertAudioIfr.src = insertAudioIfr.src;
	    }
        else if(dialogName == CKEDITOR_DIALOG_NAME_LIST.emotionsDialog)
        {
            var insertEmotionsIfr = document.getElementById("cke_insertEmotions_ifr");
            insertEmotionsIfr.src = insertEmotionsIfr.src;
        }
        else if(dialogName == CKEDITOR_DIALOG_NAME_LIST.imageUploadDialog)
        {
            var takePhotoIfr = document.getElementById("cke_takePhoto_ifr");
            takePhotoIfr.src = takePhotoIfr.src;
        }
        else if(dialogName == CKEDITOR_DIALOG_NAME_LIST.videoDialog)
        {
            var insertVideoIfr = document.getElementById("cke_insertVideo_ifr");
            insertVideoIfr.src = insertVideoIfr.src;
        }
    });
    
});