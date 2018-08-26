define(function (require, exports, module) {
    require("../../modules/plugin/jquery.gritter.min");

    $("#login").click(function () {
        checkUserForm()
    });
    $(".forgot-password-link").click(function () {
        show_box('forgot-box');
        return false;
    });
    $(".user-signup-link").click(function () {
        show_box('signup-box');
        return false;
    });
    $(".back-to-login-link").click(function () {
        show_box('login-box');
        return false;
    });
    function show_box(id) {
        jQuery('.widget-box.visible').removeClass('visible');
        jQuery('#' + id).addClass('visible');
    }

    function checkUserForm() {
        var userName = $("#username").val().trim();
        var userPassword = $("#password").val().trim();
        if (userName == "" || userPassword == "") {
            alert("用户名或密码不能为空");
            return false;
        }
        var remember_me = document.getElementById("remember_me").checked;
        //自动登陆
        if (remember_me) {
            localStorage.setItem("userName", userName);
            localStorage.setItem("userPassword", userPassword);
            localStorage.setItem("auto_login", 1);
        } else {
            localStorage.setItem("userName", null);
            localStorage.setItem("userPassword", null);
            localStorage.setItem("auto_login", 0);
        }
        localStorage.setItem("login_time", new Date().getTime());
        document.loginForm.submit();
    }

    //按回车键提交表单
    $(document).keypress(function (e) {
        if (e.which == 13) {
            checkUserForm();
        }
    });
    //记住我功能
    var login_time = localStorage.getItem("login_time");
    var auto_login = localStorage.getItem("auto_login");

    if (login_time == null || auto_login == 0) {
        localStorage.setItem("login_time", new Date().getTime());
        $("#username").val("");
        $("#password").val("");
        document.getElementById("remember_me").checked = false;
    } else {
        document.getElementById("remember_me").checked = true;
        //7天后登陆信息过期
        var inter_mils = (new Date().getTime() - login_time);
        var inter_day = inter_mils / (1000 * 60 * 60 * 24 * 7);

        if (inter_day < 7) {
            var userName = localStorage.getItem("userName");
            var userPassword = localStorage.getItem("userPassword");
            $("#username").val(userName);
            $("#password").val(userPassword);
            localStorage.setItem("login_time", new Date().getTime());
        } else {
            localStorage.setItem("userName", null);
            localStorage.setItem("userPassword", null);
            localStorage.setItem("login_time", null);
        }
    }


//新用户注册
    $("#register_bt").on("click", function () {
        var protocolCheck = $("#protocol").get(0).checked;
        if (!protocolCheck) {
            $.gritter.add({
                title: "请接受用户协议",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        } else {
            var username = $("#new_username").val().trim();
            var password = $("#new_password").val().trim();
            var repassword = $("#new_repassword").val().trim();
            if (username == "") {
                $.gritter.add({
                    title: "用户名不能为空",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            if (password == "") {
                $.gritter.add({
                    title: "密码不能为空",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            if (password != repassword) {
                $.gritter.add({
                    title: "密码与确认密码不相同",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/role/register",
                data: {username: username, password: password},
                success: function (data) {
                    if (data.flag == true) {
                        $.gritter.add({
                            title: "恭喜您，注册成功！",
                            text: '<h4><b class="green">3秒后主动登陆到主页，如果没有跳转，请点击此<a href="#" class="blue">链接</a></b></h4>',
                            time: 2000,
                            class_name: 'gritter-success gritter-center gritter-light'
                        });
                        $("#username").val(username);
                        $("#password").val(password);
                        localStorage.setItem("userName", null);
                        localStorage.setItem("userPassword", null);
                        localStorage.setItem("login_time", null);
                        setTimeout(function () {
                            document.loginForm.submit();
                        }, 3000);
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