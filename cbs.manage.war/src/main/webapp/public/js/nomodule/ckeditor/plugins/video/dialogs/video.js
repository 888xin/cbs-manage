/*
 Copyright lifiex
*/
CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.videoDialog, function ( editor ) {
    return {
    	title: '插入/搜索视频',
    	resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                elements: [
                    {
                        type: 'html',
                        html: '<div style="width:710px;height:560px;"><iframe id="cke_insertVideo_ifr" frameborder="0" src="http://www.l99.com/js/editor/jscripts/ckeditor/plugins/video/media.htm" style="border: 0px none;overflow:hidden;width:710px;height:560px;"></iframe></div>'
                    }
                ]
            }
        ],
        buttons: []
    };
});