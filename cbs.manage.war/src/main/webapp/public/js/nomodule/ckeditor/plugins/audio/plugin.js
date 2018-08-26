CKEDITOR.plugins.add( 'audio', {
	lang: ['zh-cn','en'],
    init: function( editor ) {
    	editor.addCommand( 'insertAudio', new CKEDITOR.dialogCommand( CKEDITOR_DIALOG_NAME_LIST.audioDialog ) );
    	CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.audioDialog, this.path + 'dialogs/insertAudio.js' );
    	editor.ui.addButton( 'Audio', {
    	    label: '插入音乐',
    	    command: 'insertAudio',
    	    icon: ''
    	});
    },
    beforeInit : function( editor ){
		dataProcessor = editor.dataProcessor,
		dataFilter = dataProcessor && dataProcessor.dataFilter;
		var audioUtil = new AudioUtils();
		dataFilter.addRules( {
			elements: {
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
					
					var objType1 = (audioUtil.lookup[objKey1] || audioUtil.lookup[objKey2] || {}).name;
				    objType1 = objType1 || (audioUtil.lookup[embedKey] || {}).name;
					
					var objType = (objType1 || '').toLowerCase();
					if(objType == "audio"){
						var audioImgObj = audioUtil.objectToImg(element);
						return audioImgObj ? audioImgObj : null;
					}
					
					return element;
				}
			}
		});
    }
});