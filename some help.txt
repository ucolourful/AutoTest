//IATP 首页 JS
layui.use(['element', 'form', 'jquery', 'layer'], function () {
    let $ = layui.jquery;
    let element = layui.element;
    let layer = layui.layer;
    let form = layui.form;
    updateSelections();

    $("#user-menu dd").on("click", function () {
        $(this).removeClass();
        if (this.id === "user-info") {
            layer.msg("基本资料");
        }
        if (this.id === "user-set") {
            layer.msg("个人设置")
        }
    });

    // 侧边导航栏监听
    $("#testmode-list li").on("click", function () {
        layer.msg($(this).attr("data-value"));
        $("#body-content").html($(this).attr("data-value"));
    });

    // 监听选择下拉框
    form.on('select', function (data) {
        let postdata;
        if (this.parentNode.parentNode.parentNode.id === "product") {
            postdata = {"product_id": data.value}
        }
        if (this.parentNode.parentNode.parentNode.id === "version") {
            postdata = {"version_id": data.value}
        }
        $.ajax({
            type: "POST",
            url: "/userset/",
            data: postdata,
        }).done(function (res) {
            if (res.status === 0) {
                updateSelections();
            }
        })
    });

    // 获取产品线&个人设置
    function updateSelections() {
        $("select[name=product-search]").empty();
        let products = "";
        let usersetting = "";
        $.when(
            // 请求获取产品线信息
            $.ajax({
                type: "GET",
                url: "/products/",
            }).done(function (res) {
                products = res.msg
            }),
            // 请求获取个人设置
            $.ajax({
                type: "GET",
                url: "/userset/",
            }).done(function (res) {
                usersetting = res.msg
            })
        ).done(function () {
            // 通过个人设置初始化产品线下拉框
            let optionString = "<option value=\'\'>请搜索产品线</option>";
            for (let i = 0; i < products.length; i++) {
                if (usersetting.product_id === products[i].id) {
                    optionString += "<option value=\'" + products[i].id + "\' selected=\'selected\'>" + products[i].productname + "</option>";
                } else {
                    optionString += "<option value=\'" + products[i].id + "\'>" + products[i].productname + "</option>";
                }
            }
            $("select[name=product-search]").append(optionString);
            form.render();

            // 通过个人设置，确定是否获取版本信息
            // 因为版本是级联产品线的，必须要将产品线绘制完毕后才获取版本信息
            updateVersions(usersetting);
        });
    }

    function updateVersions(usersetting) {
        $("select[name=version-search]").empty();
        if (usersetting.product_id === null) {
            return false;
        }
        updateTestMode(usersetting);
        $.ajax({
            type: "POST",
            url: "/versions/",
            data: {"product_id": usersetting.product_id},
        }).done(function (res) {
            let versions = res.msg;
            let optionString = "<option value=\'\'>请搜索版本号</option>";
            for (var i = 0; i < versions.length; i++) {
                if (usersetting.version_id === versions[i].id) {
                    optionString += "<option value=\'" + versions[i].id + "\' selected=\'selected\'>" + versions[i].versionname + "</option>";
                } else {
                    optionString += "<option value=\'" + versions[i].id + "\'>" + versions[i].versionname + "</option>";
                }
            }
            $("select[name=version-search]").append(optionString);
            form.render();
        })
    }

    function updateTestMode(usersetting) {
        $("#testmode-list").empty();
        if (usersetting.version_id === null) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: "/versiontestmodes/",
            data: {"version_id": usersetting.version_id}
        }).done(function (res) {
            console.log(res.msg);
            let versiontestmodes = res.msg;
            let liString = "";
            for (var i = 0; i < versiontestmodes.length; i++) {
                if (usersetting.testmode_id === versiontestmodes[i].id){
                    liString += "<li class=\'layui-nav-item layui-this\' data-value=\'"+versiontestmodes[i].id+"\'><a href=\'javascript:\'>"+versiontestmodes[i].versiontmname+"</a></li>"
                }else{
                    liString += "<li class=\'layui-nav-item\' data-value=\'"+versiontestmodes[i].id+"\'><a href=\'javascript:\'>"+versiontestmodes[i].versiontmname+"</a></li>"
                }
            }
            $("#testmode-list").append(liString);
            element.render();
        })
    }
});
