define(function(require, exports, module) {
	require("../common/common");
	require("../../modules/plugin/jquery.gritter.min");
	require("../../modules/plugin/excel/jquery.base64.js");

	//初始化查询微网&梦网短信余量
	queryBalance(0);
	queryBalance(1);
	
	$('#search_balance_MW').click(queryBalanceMW);
	$('#search_balance_WW').click(queryBalanceWW);
	
	function queryBalanceMW(search_type) {
		queryBalance(0);
	}
	
	function queryBalanceWW(search_type) {
		queryBalance(1);
	}
	
	function queryBalance(search_type) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/statistic/massage/search",
			data : {type:search_type},
			success : function(data) {
				if(search_type==0){
					$("#remainMW").val(data);
				} else if(search_type==1){
					$("#remainWW").val(data);
				}
			},
			error : function(XMLHttpRequest) {
				$.gritter.add({
					title : XMLHttpRequest.status,
					text : XMLHttpRequest.statusText,
					time : 2000,
					class_name : 'gritter-error gritter-center'
				});
			}
		});
	}

});