layui.use(['element','jquery','layer'], function() {
    var element = layui.element;
    var layer = layui.layer
    var $ = layui.jquery

    var editor = ace.edit('editor',{
        theme: "ace/theme/dracula",
        mode: "ace/mode/python",
        autoScrollEditorIntoView: true,
        maxLines: 30,
        minLines: 30
    });

    $("#test").on("click",function(){
//        $(".layui-header").hidden();
    });

//    $("#test").on("click",function() {
//        $.ajax({
//            type: "POST",
//            url: "/testDO",
//            data: { param: editor.getValue() }
//        }).done(function(ret){
//            console.log(ret.msg);
//        });
//    });
});
