/*
 Copyright lifiex
*/
CKEDITOR.plugins.add( 'emotions', {
    init: function( editor ) {
        //Plugin logic goes here.
    	editor.addCommand( 'insertEmotions', new CKEDITOR.dialogCommand( CKEDITOR_DIALOG_NAME_LIST.emotionsDialog ) );
    	CKEDITOR.dialog.add( CKEDITOR_DIALOG_NAME_LIST.emotionsDialog, this.path + 'dialogs/emotions.js' );
    	
    	editor.ui.addButton( 'emotions', {
    	    label: '插入表情符号',
    	    command: 'insertEmotions',
    	    toolbar: 'insert' ,
    	    icon: this.path + 'icons/logo_ckeditor.png'
    	});
    }
});
