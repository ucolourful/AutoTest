# coding=utf-8
import json, urllib

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from AutoTest.models import *


# 首页
def index(request):
    # 用户未登录，返回登录页
    if "username" not in request.session:
        return redirect('/login')

    # 1.获取用户名，获取用户配置
    username = request.session["username"]
    if len(UserOptTable.objects.filter(userName=username)) == 0:
        userOpt = UserOptTable(userName=username, dftVerName="请选择", dftVerId=0, dftTmodeName="请选择", dftTmodeId=0,
                               dftCaseName="请选择", dftCaseId=0, dftCasePId=0)
        userOpt.save()
    elif len(UserOptTable.objects.filter(userName=username)) > 1:
        for todel in UserOptTable.objects.filter(userName=username):
            todel.delete()
        userOpt = UserOptTable(userName=username, dftVerName="请选择", dftVerId=0, dftTmodeName="请选择", dftTmodeId=0,
                               dftCaseName="请选择", dftCaseId=0, dftCasePId=0)
        userOpt.save()
    else:
        userOpt = UserOptTable.objects.get(userName=username)

    return render(request, "index.html", {
        'versinList': VersionTable.objects.all(),
        'tmodeList': TmodeTable.objects.all(),
        'userOpt': userOpt})


# 保存用户配置
def saveUserSetting(request):
    # 查看用户session
    if "username" not in request.session:
        return HttpResponse(json.dumps({"status": 1, "msg": " 请登录"}), content_type="application/json")

    uot = UserOptTable.objects.get(userName=request.session["username"])
    # 保存用户默认version设置
    if "versionName" in request.POST and "versionId" in request.POST:
        uot.dftVerName = urllib.unquote(request.POST["versionName"])
        uot.dftVerId = int(request.POST["versionId"])
    # 保存用户默认tmode设置
    if "tmodeName" in request.POST:
        uot.dftTmodeName = urllib.unquote(request.POST["tmodeName"])
        uot.dftTmodeId = int(request.POST["tmodeId"])
    # 保存用户默认case设置
    if "caseName" in request.POST:
        uot.dftCaseName = urllib.unquote(request.POST["caseName"])
        uot.dftCaseId = int(request.POST["caseId"])
        uot.dftCasePId = int(request.POST["casePId"])
    uot.save()
    return HttpResponse(json.dumps({"status": 0, "msg": "save success"}), content_type="application/json")


# 获取用例信息
def getAllTestCase(request):
    # 查看用户session
    if "username" not in request.session:
        return HttpResponse(json.dumps({"status": 1, "msg": " 请登录"}), content_type="application/json")
    # 获取用户设置
    userOpt = UserOptTable.objects.get(userName=request.session["username"])

    # 获取用例列表
    caseList = []
    for case in CaseTable.objects.all():
        # if case.id == userOpt.dftCaseId:
        #     if case.pId != 0:

        caseList.append(model_to_dict(case))
    return HttpResponse(json.dumps({"status": 0, "msg": caseList}), content_type="application/json")
