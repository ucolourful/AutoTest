layui.use(['jquery', 'layer'], function () {
    var layer = layui.layer;
    var $ = layui.jquery;
    var sideDisplay = "0"

    // 监听 顶部右方导航按钮事件
    $(".header-right").on("click", function(event) {
        menuClose();
        if ( $("#"+ this.id +" .header-more").css("border-top-style") != "none" ) {
            menuOpen(this.id);
            return false;
        }
        menuClose();
    });

    // 关闭menu
    $(document).on("click", function(event){
        menuClose();
        return false;
    });

    function menuOpen(id) {
        $("#" + id + " .header-more").css("margin-top","-3px");
        $("#" + id + " .header-more").css("border-top-style","none");
        $("#" + id + " .header-more").css("border-bottom-style","solid");
        $("#" + id + " .header-more").css("border-bottom-color","rgba(255,255,255,.7)");
        $("#" + id + " .menu-more").css("display","block");
        $("#" + id + " .menu-more").css("background-color","rgba(0,0,0,.3)");
        $("#" + id).css("border-bottom","3px solid yellow");
        $("#" + id).css("color","white");
    };

    function menuClose() {
        $(".header-more").css("margin-top","-3px");
        $(".header-more").css("border-top-style","solid");
        $(".header-more").css("border-bottom-style","none");
        $(".header-more").css("border-top-color","rgba(255,255,255,.7)");
        $(".menu-more").css("display","none");
        $(".menu-more").css("background-color","rgba(0,0,0,.3)");
        $(".header-right").css("border-bottom","none");
        $(".header-right").css("color","rgba(255,255,255,.7)");
    };

//    $("#test").on("mousedown", function (event) {
//        layer.alert(event.button);
//    });

    // var editor = ace.edit('editor', {
    //     theme: "ace/theme/dracula",
    //     mode: "ace/mode/python",
    //     autoScrollEditorIntoView: true,
    //     maxLines: 30,
    //     minLines: 30
    // });

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
