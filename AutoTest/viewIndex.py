# coding=utf-8
import json

from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "index.html")


def testDO(request):
    # TODO 传入python代码，将其写入uuid的py文件中，然后执行调用
    return HttpResponse(json.dumps({"status": 1, "msg": request.POST["param"]}), content_type="application/json")
    # return render(request, "index.html")
