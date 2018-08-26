CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.imageUploadDialog, function ( editor ) {
	var projectPath = CKEDITOR.projectPath;
	if(!projectPath){
		projectPath = "http://manage.caibisai.com";
	}
    return {
    	title: '插入照片',
    	resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        minWidth: 600,
        minHeight: 580,
        contents: [
            {
                elements: [
                    {
                        type: 'html',
                        html: '<div style="width: 600px; height: 580px;"><iframe id="cke_takePhoto_ifr" frameborder="0" src="' + projectPath + '/goods/editor/image?ckeditorFlag=true" style="border: 0px none; width: 600px; height: 580px;"></iframe></div>'
                    }
                ]
            }
        ],
        buttons: []
    };
});