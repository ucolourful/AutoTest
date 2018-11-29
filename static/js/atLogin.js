//AT 登录页 JS
layui.use(['layer','jquery'], function () {
    layer = layui.layer;
    $ = layui.jquery

    // 监听登录按钮
    $("#at-form-item-submit").on("click",function(event){
        // 验证用户名密码
        if ( $.trim($("#username").val()) === "" ) {
            layer.msg("请输出用户名");
            return false;
        };
        if ( $.trim($("#password").val()) === "" ) {
            layer.msg("请输入密码");
            return false;
        };

        // ajax 异步验证用户名密码
        $("#at-form-item-submit").attr("disabled","disabled");
        $("#at-form-item-submit").css("background-color", "grey");
        $.ajax({
            type: "POST",
            url: "/doLogin",
            data: { username: $.trim($("#username").val()), password: $.trim($("#password").val()) }
        }).done(function(res){
            layer.msg(res.msg);
            if ( res.status === 0 ){
                setTimeout("window.location.href='/index'",2000)
            } else {
                $("#at-form-item-submit").removeAttr("disabled");
                $("#at-form-item-submit").css("background-color", "#009688");
            };
        });
    });

    // 监听重置按钮
    $("#at-form-item-reset").on("click",function(event){
        $(".at-form-item-input").val("");
    });

    // 监听回车键，触发登录事件
    $(document).keyup(function(event) {
        if ( event.keyCode === 13) {
            $("#at-form-item-submit").trigger("click");
        };
    });
});
