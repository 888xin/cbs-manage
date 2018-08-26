define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/x-editable/ace-editable.min.js");
    require("../../modules/plugin/fakeLoader.min.js");
    $("#back_main").on("click", function() {
        $(".fakeloader").fakeLoader({
            timeToHide: 3000,
            bgColor: "#9b59b6",
            spinner: "spinner7"
        });
        window.location.href = appName + "/gotopage/main";
    });
    //常量
    //editables on first profile page
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x icon-spinner icon-spin'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="icon-ok icon-white"></i></button>' +
        '<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>';
    //editables
    $('#password').editable({
        type: 'password',
        name: 'password',
        success: function(response, newValue) {
            newValue = newValue.trim();
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/role/update",
                data: {
                    roleId: roleId,
                    password: newValue
                },
                success: function(data) {
                    if (data.flag == true) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success gritter-center gritter-light'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "注册失败，请联系管理员！",
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                },
                error: function(XMLHttpRequest) {
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
    // *** editable avatar *** //
    try { //ie8 throws some harmless exception, so let's catch it
        //it seems that editable plugin calls appendChild, and as Image doesn't have it, it causes errors on IE at unpredicted points
        //so let's have a fake appendChild for it!
        if (/msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase())) Image.prototype.appendChild = function(el) {}
        var last_gritter
        $('#avatar').editable({
            type: 'image',
            name: 'avatar',
            value: null,
            image: {
                //specify ace file input plugin's options here
                btn_choose: 'Change Avatar',
                droppable: true,
                name: 'avatar', //put the field name here as well, will be used inside the custom plugin
                max_size: 210000, //~100Kb
                on_error: function(code) { //on_error function will be called when the selected file has a problem
                    if (last_gritter) $.gritter.remove(last_gritter);
                    if (code == 1) { //file format error
                        last_gritter = $.gritter.add({
                            title: 'File is not an image!',
                            text: 'Please choose a jpg|gif|png image!',
                            class_name: 'gritter-error gritter-center'
                        });
                    } else if (code == 2) { //file size rror
                        last_gritter = $.gritter.add({
                            title: 'File too big!',
                            text: 'Image size should not exceed 200Kb!',
                            class_name: 'gritter-error gritter-center'
                        });
                    } else { //other error
                    }
                },
                on_success: function() {
                    $.gritter.removeAll();
                }
            },
            url: function(params) {
                // ***UPDATE AVATAR HERE*** //
                //You can replace the contents of this function with examples/profile-avatar-update.js for actual upload
                var deferred = new $.Deferred
                    //if value is empty, means no valid files were selected
                    //but it may still be submitted by the plugin, because "" (empty string) is different from previous non-empty value whatever it was
                    //so we return just here to prevent problems
                var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
                if (!value || value.length == 0) {
                    deferred.resolve();
                    return deferred.promise();
                }
                //dummy upload
                setTimeout(function() {
                    if ("FileReader" in window) {
                        //for browsers that have a thumbnail of selected image
                        var thumb = $('#avatar').next().find('img').data('thumb');
                        if (thumb) $('#avatar').get(0).src = thumb;
                        //上传头像
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: appName + "/role/add/avatar",
                            data: {
                                roleId: roleId,
                                thumb: thumb
                            },
                            success: function(data) {
                                if (data.flag) {
                                    deferred.resolve({
                                        'status': 'OK'
                                    });
                                    if (last_gritter) $.gritter.remove(last_gritter);
                                    last_gritter = $.gritter.add({
                                        title: '头像修改成功!',
                                        class_name: 'gritter-info gritter-center'
                                    });
                                } else {
                                    deferred.resolve({
                                        'status': 'NO'
                                    });
                                    if (last_gritter) $.gritter.remove(last_gritter);
                                    last_gritter = $.gritter.add({
                                        title: '头像修改失败!',
                                        class_name: 'gritter-error gritter-center'
                                    });
                                }
                            },
                            error: function(XMLHttpRequest) {
                                deferred.resolve({
                                    'status': 'NO'
                                });
                                if (last_gritter) $.gritter.remove(last_gritter);
                                last_gritter = $.gritter.add({
                                    title: XMLHttpRequest.status,
                                    text: XMLHttpRequest.statusText,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        });
                    }
                }, parseInt(Math.random() * 800 + 800))
                return deferred.promise();
            },
            success: function(response, newValue) {}
        })
    } catch (e) {}

})