layui.use(['jquery', 'layer'], function () {
    let layer = layui.layer;
    let $ = layui.jquery;
    initAceEditor();
    createTree();

    // 监听 顶部右方导航按钮事件
    $(".at-header-menu").on("click", function () {
        topMenuClose();
        if ($("#" + this.id + " .at-header-menu-icon").css("border-top-style") !== "none") {
            topMenuOpen(this.id);
            return false;
        } else {
            topMenuClose();
            return false;
        }
    });

    // 监听 顶部导航menu按钮
    $(".at-header-menu .at-header-menu-more li").on("click", function () {
        topMenuClose();
        let datas = {};
        let tempTitle = "";

        // 切换"版本" or 切换"模式"
        if (this.parentNode.parentNode.id === "header-menu-version") {
            tempTitle = "版本：";
            datas["versionName"] = $(this).attr("value");
            datas["versionId"] = $(this).attr("data-value");
        } else if (this.parentNode.parentNode.id === "header-menu-tmode") {
            tempTitle = "模式：";
            datas["tmodeName"] = $(this).attr("value");
            datas["tmodeId"] = $(this).attr("data-value");
        } else {
            layer.msg("user operation");
            return false;
        }
        // 设置header显示
        this.parentNode.parentNode.firstChild.nextSibling.innerText = tempTitle + $(this).attr("value");

        $.ajax({
            type: "POST",
            url: "/saveUserSetting",
            data: datas
        }).done(function (res) {
            console.log("versionName or tmodeName：" + res.msg)
        });

        // 设置下拉框的选中属性
        let node = this.parentNode.firstChild;
        for (; node; node = node.nextSibling) {
            if (node.nodeType === 1) {
                node.className = "at-header-menu-more-select";
            }
        }
        this.className = "at-header-menu-more-selected";
        return false;
    });

    // ztree 单击事件监听. 若为叶子节点，触发ajax行为，记录当前节点
    function onClick(e, treeId, treeNode) {
        if (treeNode.isParent)
            return false;
        $.ajax({
            type: "POST",
            url: "saveUserSetting",
            data: {caseName: treeNode.name, caseId: treeNode.id, casePId: treeNode.pId}
        }).done(function (res) {
            console.log("caseName：" + res.msg);
        });
        console.log(treeNode.caseTestStep);
        return false;
    }

    // ztree 右键单击事件监听
    function onRightClick() {
        layer.alert("右键单击");
        return false;
    }

    // 建立用例树状图
    function createTree() {
        // ztree初始化
        let ztreeSetting = {
            check: {enable: false},
            data: {
                // 简单数据模式
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId"
                }
            },
            callback: {
                onClick: onClick,
                onRightClick: onRightClick
            }
        };
        $.ajax({
            type: "GET",
            url: "/getAllTestCase",
            success: function (res) {
                // 初始化用例树
                $("#dataModelCatalog").empty();
                $.fn.zTree.init($("#dataModelCatalog"), ztreeSetting, res.msg);

                // 展开用户上次选中的用例
                let treeObj = $.fn.zTree.getZTreeObj("dataModelCatalog");
                let node = treeObj.getNodeByParam("id", $("#userDftCaseId").val());
                treeObj.selectNode(node);
                while (node.pId !== 0) {
                    if (node.pId === null) {
                        break;
                    }
                    let pNode = treeObj.getNodeByParam("id", node.pId);
                    treeObj.expandNode(pNode, true, false, true);
                    node = treeObj.getNodeByParam("id", pNode.id);
                }
            }
        });
    }

    // 初始化editor,并添加监听事件
    function initAceEditor() {
        // 初始化editor
        let editorpre = ace.edit('editorpre');
        let editorstep = ace.edit('editorstep');
        let editorexp = ace.edit('editorexp');
        let editorreal = ace.edit('editorreal');
        let editordesc = ace.edit('editordesc');
        let editorlog = ace.edit('editorlog');

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
        editorpre.on("blur", function () {
            editorpre.setReadOnly(true);
        });
        editorstep.on("blur", function () {
            editorstep.setReadOnly(true);
        });
        editorexp.on("blur", function () {
            editorexp.setReadOnly(true);
        });
        editorreal.on("blur", function () {
            editorreal.setReadOnly(true);
        });
        editordesc.on("blur", function () {
            editordesc.setReadOnly(true);
        });

        // 设定双击监听事件，可编辑
        editorpre.on("focus", function () {
            editorpre.setReadOnly(false);
        });
        editorstep.on("focus", function () {
            editorstep.setReadOnly(false);
        });
        editorexp.on("focus", function () {
            editorexp.setReadOnly(false);
        });
        editorreal.on("focus", function () {
            editorreal.setReadOnly(false);
        });
        editordesc.on("focus", function () {
            editordesc.setReadOnly(false);
        });
    }

    // 关闭menu
    $(document).on("click", function () {
        topMenuClose();
        return false;
    });

    // 打开顶部按钮菜单
    function topMenuOpen(id) {
        $("#" + id + " .at-header-menu-icon").css("margin-top", "-3px");
        $("#" + id + " .at-header-menu-icon").css("border-top-style", "none");
        $("#" + id + " .at-header-menu-icon").css("border-bottom-style", "solid");
        $("#" + id + " .at-header-menu-icon").css("border-bottom-color", "rgba(255,255,255,.7)");
        $("#" + id + " .at-header-menu-more").css("display", "block");
        $("#" + id + " .at-header-menu-more").css("background-color", "rgba(0,0,0,.3)");
        $("#" + id).css("border-bottom", "3px solid yellow");
        $("#" + id).css("color", "white");
    }

    // 关闭顶部按钮菜单
    function topMenuClose() {
        $(".at-header-menu-icon").css("margin-top", "-3px");
        $(".at-header-menu-icon").css("border-top-style", "solid");
        $(".at-header-menu-icon").css("border-bottom-style", "none");
        $(".at-header-menu-icon").css("border-top-color", "rgba(255,255,255,.7)");
        $(".at-header-menu-more").css("display", "none");
        $(".at-header-menu-more").css("background-color", "rgba(0,0,0,.3)");
        $(".at-header-menu").css("border-bottom", "none");
        $(".at-header-menu").css("color", "rgba(255,255,255,.7)");
    }
});
