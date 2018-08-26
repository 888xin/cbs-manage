CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.audioDialog, function ( editor ) {
    return {
    	title: '插入/搜索音乐',
    	resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        minWidth: 738,
        minHeight: 352,
        contents: [
            {
                elements: [
                    {
                        type: 'html',
                        html: '<div style="width: 738px; height: 352px;"><iframe id="cke_insertAudio_ifr" scrolling="no" frameborder="0" src="http://www.l99.com/js/editor/jscripts/ckeditor/plugins/audio/audio.htm?mce_rdomain=l99.com" style="border: 0px none; width: 738px; height: 352px;"></iframe></div>'
                    }
                ]
            }
        ],
        buttons: []
    };
});