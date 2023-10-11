---
create_date: 2023-02-03 01:21
tags: '学习/计算机网络原理'
---
# 简介

同时使用 TCP 和 UDP 协议
是一种**查询/回复**类型的协议
消息格式相同

# 消息格式

- Identification：16 位查询编号，回复时回应相同编号
- flags
	- 查询或回复
	- 期望递归
	- 递归可用
	- 权威回答
- questions
- answers
- authority
- additional infomation