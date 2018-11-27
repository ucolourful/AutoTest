//AT 登录页 JS
layui.use(['element','layer','form','jquery'], function () {
    var element = layui.element;
    var form = layui.form;
    layer = layui.layer;
    $ = layui.jquery

    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '用户名也太短了吧';
            }
        }
        , pass: [/(.+){6,12}$/, '密码必须6到12位']
    });

    //监听提交
    form.on('submit(*)', function (data) {
        $.post("/userLogin",data.field,function(ret){
            if ( ret.status == 0 ){
                layer.msg(ret.msg)
                setTimeout("window.location.href='/index'",2000)
            }
            if ( ret.status == 1 ){
                layer.msg(ret.msg)
            }
        })
//        layer.msg(JSON.stringify(data.field))
        return false
    });
});
