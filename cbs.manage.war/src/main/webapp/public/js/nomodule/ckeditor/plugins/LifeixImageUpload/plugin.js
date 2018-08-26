CKEDITOR.plugins.add( 'LifeixImageUpload', {
    init: function( editor ) {
    	editor.addCommand( 'lifeiximageupload', new CKEDITOR.dialogCommand( CKEDITOR_DIALOG_NAME_LIST.imageUploadDialog ) );
    	CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.imageUploadDialog, this.path + 'dialogs/imageUpload.js' );
    	
    	editor.ui.addButton( 'LifeixImageUpload', {
    	    label: '照片上传',
    	    command: 'lifeiximageupload',
    	    toolbar: 'insert',
    	    icon: this.path + 'icons/anchor.png'
    	});
    }
});