# coding=utf-8
import json

from django.http import HttpResponse
from django.shortcuts import render
from AutoTest.models import *


def testData():
    """
    生成测试数据
    :return:
    """
    if len(UserTable.objects.all()) != 0:
        return False

    for i in range(1, 6):
        ut = UserTable(userName="liming" + str(i), passWord="liming" + str(i), emailAddr="test")
        ut.save()

        vt = VersionTable(versionName="测试版本_" + str(i))
        vt.save()

        tt = TmodeTable(tmodeName="用例设计_" + str(i))
        tt.save()

        ct = CaseTable(name="测试套_" + str(i), caseAName="Tester_" + str(i), isParent=1, pId=0, casePreCond="",
                       caseTestStep="", caseExpRes="", caseRealRes="", caseDesc="", caseTestLog="")
        ct.save()
        for j in range(1, 6):
            ct2 = CaseTable(name="测试套_" + str(i) + "_" + str(j), caseAName="Tester_" + str(i) + "_" + str(j),
                            isParent=1, pId=ct.id, casePreCond="", caseTestStep="", caseExpRes="", caseRealRes="",
                            caseDesc="", caseTestLog="")
            ct2.save()

    for ct in CaseTable.objects.all():
        if ct.pId == 0:
            continue
        if len(CaseTable.objects.filter(pId=ct.id)) == 0:
            for i in range(1, 6):
                ctt = CaseTable(name="测试用例" + str(i), caseAName="test", isParent=0, pId=ct.id,
                                casePreCond="preCond" + str(i),
                                caseTestStep="caseTestStep" + str(i), caseExpRes="caseExpRes" + str(i),
                                caseRealRes="caseRealRes",
                                caseDesc="caseDesc", caseTestLog="caseTestLog")
                ctt.save()


# 登录页面
def login(request):
    testData()
    return render(request, "login.html")


# 登录操作
def doLogin(request):
    # 未传入"username" or "password" ，登录失败。
    if "username" not in request.POST or "password" not in request.POST:
        return HttpResponse(json.dumps({"status": 1, "msg": "登录失败，请刷新页面后重新登录"}),
                            content_type="application/json")

    # 验证"username" and "password"
    if len(UserTable.objects.filter(userName=request.POST["username"])) == 0 or len(
            UserTable.objects.filter(userName=request.POST["username"], passWord=request.POST["password"])) == 0:
        return HttpResponse(json.dumps({"status": 1, "msg": "登录失败，用户名或密码错误"}),
                            content_type="application/json")

    # 登录成功，跳转主页
    request.session["username"] = request.POST["username"]
    return HttpResponse(json.dumps({"status": 0, "msg": "登录成功，即将跳转到首页..."}),
                        content_type="application/json")
