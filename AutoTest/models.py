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


class UserOptTable(models.Model):
    """
    用户默认行为表
    """
    userName = models.CharField(max_length=30)
    # 首页默认版本号
    dftVerName = models.CharField(max_length=300)
    dftVerId = models.IntegerField()

    # 首页默认模式号
    dftTmodeName = models.CharField(max_length=300)
    dftTmodeId = models.IntegerField()

    # 首页默认用例号
    dftCaseName = models.CharField(max_length=300)
    dftCaseId = models.IntegerField()
    dftCasePId = models.IntegerField()


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
    name = models.CharField(max_length=30)
    # 用例作者名
    caseAName = models.CharField(max_length=30)
    # 父节点id
    pId = models.IntegerField()
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
