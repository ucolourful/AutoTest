# coding=utf-8
from django.shortcuts import render


# 登录页面
def login(request):
    return render(request, "login.html")
