/*
 Copyright lifiex
*/
CKEDITOR.plugins.add( 'video', {
    icons: '',
    init: function( editor ) {
        //Plugin logic goes here.
    	
    	editor.addCommand( 'insertVideo', new CKEDITOR.dialogCommand( CKEDITOR_DIALOG_NAME_LIST.videoDialog ) );
    	CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.videoDialog, this.path + 'dialogs/video.js' );
    	
    	editor.ui.addButton( 'Video', {
    	    label: '插入/编辑嵌入媒体',
    	    command: 'insertVideo',
    	    toolbar: 'insert'
    	});
    },
    beforeInit: function( editor ){
		dataProcessor = editor.dataProcessor,
		dataFilter = dataProcessor && dataProcessor.dataFilter;
		var videoUtil = new VideoUtils();
		dataFilter.addRules( {
			elements: {
				'img': function( element ) {
					//alert("音频反解析");
					/*if ( element.name == 'img') {
	                    var videoObjNode = new VideoUtils().imgToObject(element);
	                    if(videoObjNode)
	                        return videoObjNode;
	                    else{
	                        element.remove();
	                        return null;
					}*/
					return element;
				},
				'object':function( element ){
					
					var objKey1 = (element.attributes["clsid"] || '').toLowerCase();
					var objKey2 = (element.attributes["type"] || '').toLowerCase();
					var embedKey;
					for(var i = 0; i < element.children.length; i++){
						var child = element.children[i];
						if(child.name === "embed"){
							embedKey = (child.attributes["type"] || '').toLowerCase();
							break;
						}
					}
					
					var objType1 = (videoUtil.lookup[objKey1] || videoUtil.lookup[objKey2] || {}).name;
				    objType1 = objType1 || (videoUtil.lookup[embedKey] || {}).name;
					
					var objType = (objType1 || '').toLowerCase();
					if(objType == "flash"){
						var videoImgObj = videoUtil.objectToImg(element);
						return videoImgObj ? videoImgObj : null;
					}
					
					return element;
				}
			}
		});
    }
});