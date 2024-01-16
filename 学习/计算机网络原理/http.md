---
aliases:
- 超文本传输协议
create_date: 2023-02-03 01:58
tags: '学习/计算机网络原理'
---

# 简介

HTTP 是一种 [[客户-服务器应用模型|C/S结构]] 的应用层传输协议

客户端：用户端浏览器
服务端：服务器网页提供程序

请求（命令）/响应模式

主流使用 HTTP1.0/HTTP1.1，HTTP1.1 更多

# 传输方式
- 使用 [[TCP]] 进行信息传输
- 服务器在 80 [[端口]]等待用户请求
- 浏览器发起到服务器的 [[TCP]] 连接（创建 [[Socket]]）
- 服务器接收来自浏览器的 [[TCP]] 请求并建立连接
- 浏览器和服务器交换信息
- 关闭 [[TCP]] 连接

# 无状态（stateless）
服务器不维护任何有关客户端过去所发请求的信息

# 类型

## 非持久性连接

每个 [[TCP]] 连接最多允许传输一个对象
HTTP1.0 版本
1. 客户端向地址上的服务器发送 [[TCP]] 连接请求
2. HTTP 服务器等待 [[TCP]] 请求，接收连接并通知客户端
3. 客户端将 HTTP 请求消息通过 [[TCP]] 连接的 [[Socket]] 发出，表明客户端需要的对象
4. 服务器收到消息，生成响应消息并通过 [[Socket]] 回应
5. 服务器关闭 TCP 连接
6. 客户端解析并显示 html 文件

缺点：如果一个网页有多个引用文件，需要多次进行 TCP 连接才可以获取完整的网页

## 持久性连接

每个 [[TCP]] 连接允许传输多个对象

持久性连接优化了非持久性连接的缺点——一次只能传输一个文件
## 无流水的持久性连接
- 客户端只有收到前一个响应后才发送新的请求
- 每个被引用的对象消耗 1 个 RTT
## 带有流水机制的持久性连接
- HTTP 1.1 默认选项
- 客户端只要遇到一个引用对象就发送请求
- 理想情况下，收到的所有引用对象只用耗时 1 个 RTT

# 消息格式

![[Pasted image 20230210084036.png]]

## 请求消息
```
(GET/POST,HEAD commands) (URL) (HTTP version)
Host: (URL)
User-agent: (User Infomation)
Connection: (open/close)
Accept-language: (Language)

(Entity Body)
```

### POST 方法
- 信息较多的情况
- 在请求消息的 Entity Body 中上传客户端的输入

### GET 方法
- 通过请求消息的 requeset 行的 URL 字段进行上传

### HEAD 方法
- 请 Server 不要将所请求的对象放入响应消息中

### PUT
- 将消息体中的文件上传到 URL 字段所指定的目录

### DELETE
- 删除 URL 字段所指定的目录

## 响应消息
```
(HTTP version) (request code) (OK/ERROR)
Connection: (connect state)
Date: (date info)
Server: (Server soft name)
Last-Modified: (date info)
Content-Length: (Content Length)
Content-Type: (Content Type)

data,data,data...
```

Request code 含义
- 200 OK
- 301 Moved Permanently
- 400 Bad Request
- 404 Not Found
- 505 HTTP Version Not Suuported
