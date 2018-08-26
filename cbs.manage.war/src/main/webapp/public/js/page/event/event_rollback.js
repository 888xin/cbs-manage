/**
 * Created by lhx on 16-3-2.
 */
define(function(require) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery.bootstrap-growl.min");


    $("#rollback_main input[value=0]").get(0).checked = true;

    $("#contest_rollback_bt").on("click",function(){

        var contest_id = $("#contest_id").val();
        if (isNaN(contest_id) || !contest_id){
            $.bootstrapGrowl("请输入正确的赛事ID");
            return ;
        }


        var contest_type = $('#rollback_main input[name="contest_type"]:checked').val();

        bootbox.confirm("确定回滚该场赛事的投注?回滚会涉及到虚拟币的增加和减少，仔细检查赛事类型和赛事ID再确认回滚！", function(result) {
            if(result) {
                //确认回滚

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/event/restore/rollback/submit",
                    data: {
                        contestType: contest_type,
                        contestId: contest_id
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $.bootstrapGrowl('回滚提交成功！', {
                                type: 'success' // (null, 'info', 'error', 'success')
                            });
                        } else {
                            if (data.msg != "") {
                                $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                    }
                });

            }
        });

    });
});