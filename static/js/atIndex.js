layui.use(['jquery', 'layer'], function () {
    var layer = layui.layer;
    var $ = layui.jquery;
    var sideDisplay = "0"
    initAceEditor();


    // 监听 顶部右方导航按钮事件
    $(".header-right").on("click", function(event) {
        topMenuClose();
        if ( $("#"+ this.id +" .header-more").css("border-top-style") != "none" ) {
            topMenuOpen(this.id);
            return false;
        } else {
            topMenuClose();
            return false;
        };

    });

    // 监听 顶部导航menu按钮
    $(".header-right .menu-more li").on("click", function(event) {
        topMenuClose();

        // 切换"版本" or 切换"模式"
        if ( this.parentNode.parentNode.id === "header-right-version" ) {
            var title = "版本："
            layer.msg("switch version");
        } else if ( this.parentNode.parentNode.id === "header-right-tmode" ) {
            var title = "模式："
            layer.msg("switch mode");
        } else {
            layer.msg("user operation");
            return false;
        };

        // 设置header显示
        this.parentNode.parentNode.firstChild.nextSibling.innerText = title + this.id;

        // 设置下拉框的选中属性
        var node = this.parentNode.firstChild;
        for ( ; node; node = node.nextSibling ) {
            if ( node.nodeType === 1 ) {
                node.className = "select";
            };
        };
        this.className = "selected";
        return false;
    });


//    $(".detaildiv").on("dblclick", function(event){
//        if ( editor === null ) {
//            editor = ace.edit(this.firstChild.nextSibling.id);
//        } else {
//            layer.alert(editor.getValue());
//        };
//    });
//    var editor = ace.edit('editorpre');
//    editor.session.setMode("ace/mode/text");
//    editor.setTheme("ace/theme/tomorrow");
//    editor.setFontSize(10);
//    editor.setOption("wrap", "free");
//    editor.setReadOnly(true);

    // 关闭menu
    $(document).on("click", function(event){
        topMenuClose();
        return false;
    });

    function topMenuOpen(id) {
        $("#" + id + " .header-more").css("margin-top","-3px");
        $("#" + id + " .header-more").css("border-top-style","none");
        $("#" + id + " .header-more").css("border-bottom-style","solid");
        $("#" + id + " .header-more").css("border-bottom-color","rgba(255,255,255,.7)");
        $("#" + id + " .menu-more").css("display","block");
        $("#" + id + " .menu-more").css("background-color","rgba(0,0,0,.3)");
        $("#" + id).css("border-bottom","3px solid yellow");
        $("#" + id).css("color","white");
    };

    function topMenuClose() {
        $(".header-more").css("margin-top","-3px");
        $(".header-more").css("border-top-style","solid");
        $(".header-more").css("border-bottom-style","none");
        $(".header-more").css("border-top-color","rgba(255,255,255,.7)");
        $(".menu-more").css("display","none");
        $(".menu-more").css("background-color","rgba(0,0,0,.3)");
        $(".header-right").css("border-bottom","none");
        $(".header-right").css("color","rgba(255,255,255,.7)");
    };

    // 初始化editor,并添加监听事件
    function initAceEditor() {
        // 初始化editor
        editorpre = ace.edit('editorpre');
        editorstep = ace.edit('editorstep');
        editorexp = ace.edit('editorexp');
        editorreal = ace.edit('editorreal');
        editordesc = ace.edit('editordesc');
        editorlog = ace.edit('editorlog');

        // 配置editor
        editorpre.session.setMode("ace/mode/text");
        editorpre.setFontSize(10);
        editorpre.setOption("wrap", "free");

        editorstep.session.setMode("ace/mode/text");
        editorstep.setFontSize(10);
        editorstep.setOption("wrap", "free");

        editorexp.session.setMode("ace/mode/text");
        editorexp.setFontSize(10);
        editorexp.setOption("wrap", "free");

        editorreal.session.setMode("ace/mode/text");
        editorreal.setFontSize(10);
        editorreal.setOption("wrap", "free");

        editordesc.session.setMode("ace/mode/text");
        editordesc.setFontSize(10);
        editordesc.setOption("wrap", "free");

        // 设定editor不可编辑
        editorpre.setReadOnly(true);
        editorstep.setReadOnly(true);
        editorexp.setReadOnly(true);
        editorreal.setReadOnly(true);
        editordesc.setReadOnly(true);
        editorlog.setReadOnly(true);

        // 设定失去焦点监听事件，不可编辑
        editorpre.on("blur",function() {
            editorpre.setReadOnly(true);
        });
        editorstep.on("blur",function() {
            editorstep.setReadOnly(true);
        });
        editorexp.on("blur",function() {
            editorexp.setReadOnly(true);
        });
        editorreal.on("blur",function() {
            editorreal.setReadOnly(true);
        });
        editordesc.on("blur",function() {
            editordesc.setReadOnly(true);
        });

        // 设定双击监听事件，可编辑
        editorpre.on("focus",function(){
            editorpre.setReadOnly(false);
        });
        editorstep.on("focus",function(){
            editorstep.setReadOnly(false);
        });
        editorexp.on("focus",function(){
            editorexp.setReadOnly(false);
        });
        editorreal.on("focus",function(){
            editorreal.setReadOnly(false);
        });
        editordesc.on("focus",function(){
            editordesc.setReadOnly(false);
        });
    };

//    $("#test").on("mousedown", function (event) {
//        layer.alert(event.button);
//    });

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
