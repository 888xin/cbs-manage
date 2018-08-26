function getParam(name, default_value) {
	var value = null;
	
	//value = (typeof(name) == "undefined") ? default_value : name;
	value = default_value;
	
	// Fix bool values
	if (value == "true" || value == "false")
		return (value == "true");
	
	return value;
};

function showTab(tab){
	tab.className = 'current';
	tab.setAttribute("aria-selected", true);
	tab.setAttribute("aria-expanded", true);
	tab.tabIndex = 0;
};

function hideTab(tab){
	var t=this;
	tab.className = '';
	tab.setAttribute("aria-selected", false);
	tab.setAttribute("aria-expanded", false);
	tab.tabIndex = -1;
};

function showPanel(panel,panel_id) {
	panel.className = 'current'; 
	panel.setAttribute("aria-hidden", false);
	document.getElementById(panel_id).style.display= "block";
};

function hidePanel(panel,nodepanel_id) {
	panel.className = 'panel';
	panel.setAttribute("aria-hidden", true);
	document.getElementById(nodepanel_id).style.display= "none";
}; 

function displayTab(tab_id, panel_id, avoid_focus) {
	var panelElm, panelContainerElm, tabElm, tabContainerElm, selectionClass, nodes, i, t = this;
	tabElm = document.getElementById(tab_id);
	
	panelElm= document.getElementById(panel_id);
	panelContainerElm = panelElm ? panelElm.parentNode : null;
	tabContainerElm = tabElm ? tabElm.parentNode : null;
	selectionClass = t.getParam('selection_class', 'current');
	
	if (tabElm && tabContainerElm) {
		nodes = tabContainerElm.childNodes;

		// Hide all other tabs
		for (i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName == "LI") {
				t.hideTab(nodes[i]);
			}
		}
		
		// Show selected tab
		t.showTab(tabElm);	
	}

	if (panelElm && panelContainerElm) {
		nodes = panelContainerElm.childNodes;
		var nodepanel_id = null;
		
		// Hide all other panels
		for (i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName == "DIV") {
				nodepanel_id = nodes[i].id;
				t.hidePanel(nodes[i],nodepanel_id);
			}	
		}
		
		// Show selected panel
		t.showPanel(panelElm,panel_id);
	}
};

function displayTabInsert(file, title) {
	var picUrl = "http://static.l99.com/commentImg/" + file;
	var picAlt = title;
	
	var emotionImg = "<img src='" + picUrl + "' alt='" + picAlt +"' title='"+ title + "' border='0' />";
	parent.CKEDITOR.instances.elm1.insertHtml(emotionImg);
	
	parent.CKEDITOR.instances.elm1.focus();
	parent.CKEDITOR.dialog.getCurrent().hide();
}