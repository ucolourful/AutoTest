# encoding=utf-8

from django.db import models


class UserTable(models.Model):
    """
    用户数据表
    """
    # 用户名&密码
    userName = models.CharField(max_length=30)
    passWord = models.CharField(max_length=30)

    # 邮箱地址
    emailAddr = models.CharField(max_length=30)

    # 首页默认版本号
    defVersion = models.IntegerField()

    # 首页默认模式号
    defTmode = models.IntegerField()

    # 首页默认用例号
    defCaseOn = models.IntegerField()


class VersionTable(models.Model):
    """
    版本号数据表
    """
    versionName = models.CharField(max_length=30)


class TmodeTable(models.Model):
    """
    测试模式数据表
    """
    tmodeName = models.CharField(max_length=30)


class CaseTable(models.Model):
    """
    测试用例数据表
    """
    caseName = models.CharField(max_length=30)
    # 用例作者名
    caseAName = models.CharField(max_length=30)
    # 用例还是用例套;true为用例，false为用例套
    isDir = models.BooleanField()
    # 父节点id
    caseParentID = models.IntegerField()
    # 前置条件
    casePreCond = models.CharField(max_length=300)
    # 测试步骤
    caseTestStep = models.CharField(max_length=300)
    # 期望结果
    caseExpRes = models.CharField(max_length=300)
    # 实际结果
    caseRealRes = models.CharField(max_length=300)
    # 用例备注
    caseDesc = models.CharField(max_length=300)
    # 测试日志(需要做日志轮转)
    caseTestLog = models.CharField(max_length=300)
    # 关联问题单(单号查询，待开发提单系统)

