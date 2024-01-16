---
aliases:
- null
create_date: 2023-02-04 01:39
tags:
- 学习/计算机网络原理
---
在 GET 方法中客户端发送的请求头中添加了
```
if-modified-since: <date>
```
在 HTTP 请求中声明本地服务器所持有的版本
若 if-modifier-since 的日期不是最新的，则服务器消息响应返回最新的对象
否则只响应，不返回对象，节省了带宽
