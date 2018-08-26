define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");


    getModule();
    $("#module_value input[value=0]").get(0).checked = true;

    function getModule(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/match/getmodule",
            success: function (data) {
                if (data.code == 200) {
                    var module="";
                    switch (data.module_value){
                        case 0:
                            module="实时比分";
                            break;
                        case 1:
                            module="文字直播接管";
                            break;
                    }
                    $("#mode").html(module);
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: "错误code：" + data.code + ",错误信息：" + data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }
        });
    }

    $("#change_module_button").on("click", function (){
        var module_value = $('#module_value input[name="module_value"]:checked ').val();
        var mode="";
        switch (module_value){
            case "0":
                mode="实时比分";
                break;
            case "1":
                mode="文字直播接管";
                break;
        }
        if(window.confirm('你确定要将模式改为     '+mode+'？')){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/event/match/updatemodule",
                data: {moduleValue: module_value},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: '更新成功',
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        getModule();
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                },
                error: function (XMLHttpRequest) {
                    $.gritter.add({
                        title: XMLHttpRequest.status,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                }
            });
        }
    });



});