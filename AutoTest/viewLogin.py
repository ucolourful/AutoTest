# coding=utf-8
import json

from django.http import HttpResponse
from django.shortcuts import render
from AutoTest.models import *


def testData():
    # 用于插入测试数据
    for i in range(0, 10):
        if len(UserTable.objects.all()) < 10:
            ut = UserTable(userName="liming" + str(i), passWord="liming" + str(i), emailAddr="test")
            ut.save()
        if len(VersionTable.objects.all()) < 10:
            ut = VersionTable(versionName="测试版本" + str(i))
            ut.save()
        if len(TmodeTable.objects.all()) < 10:
            ut = TmodeTable(tmodeName="用例设计" + str(i))
            ut.save()
        if len(CaseTable.objects.filter(pId=0)) < 10:
            ct = CaseTable(name="测试套" + str(i), caseAName="", pId=0, casePreCond="",
                           caseTestStep="", caseExpRes="", caseRealRes="", caseDesc="", caseTestLog="")
            ct.save()

    if len(CaseTable.objects.all()) < 50:
        for ct in CaseTable.objects.all():
            if len(CaseTable.objects.filter(pId=ct.id)) == 0:
                for i in range(0, 10):
                    ctt = CaseTable(name="测试用例" + str(i), caseAName="test", pId=ct.id, casePreCond="preCond" + str(i),
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
