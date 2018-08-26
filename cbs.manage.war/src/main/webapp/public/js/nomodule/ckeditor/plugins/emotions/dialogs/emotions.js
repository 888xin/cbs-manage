/*
 Copyright lifiex
*/
CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.emotionsDialog, function ( editor ) {
    return {
    	title: '插入表情符号',
    	resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        minWidth: 500,
        minHeight: 363,
        contents: [
               {
                   elements: [
                       {
                           type: 'html',
                           html: '<div style="overflow: hidden;width: 520px; height: 363px;"><iframe id="cke_insertEmotions_ifr" frameborder="0" scrolling="no" src="http://www.l99.com/js/editor/jscripts/ckeditor/plugins/emotions/emotions.htm" style="border: 0px none;width: 520px; height: 363px;"></iframe></div>'
                       }
                   ]
               }
        ], 
        buttons: []
    };
});