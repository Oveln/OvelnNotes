---
aliases:
- null
create_date: 2023-02-04 01:50
tags:
- 学习/计算机网络原理
---

参考 RFC2821

# 简介


SMTP 依赖于 TCP 协议，一般运行在端口 25
命令（命令）/响应模式

# 传输过程
1. 握手阶段
2. 邮件传输阶段
3. 关闭阶段

# 命令（命令）/响应模式

命令: ASCII 文本，14条，都是由四个字母组成的
响应: 状态代码和语句，21 种，由三个数字的代码开始，后面附上（也可以不附）文字说明

Email 消息只能包含 **7 位 ASCII 码**

# 交互示例
```
S: 220 outlook.com
C: HELO qq.com
S: 250 Hello qq.com, pleased to meet you
C: MALL FROM: <alice@outlook.com>
S: 250 alice@outlook.com... Sender ok
C: RCPT TO: <bob@qq.com>
S: 250 bob@qq.com ... Recipient ok
C: DATA
S: 354 Enter mail, end with "." on a line by itself
C: Do you like ketchup?
C: How about pickles?
C: .
S: 250 Message accepted for delivery
C: QUIT
S: 221 outlook.com closing connection
```

# 特点
- 使用持久性链接
- 要求消息必须由 7 位 ASCII 码构成
- SMTP 服务器利用 CRLF. CRLF 确定消息的结束，所以传输内容不能包括 CRLF. CRLF
- SMTP 是“推动”协议

# 消息格式
- 头部行
	- FROM
	- TO
	- SUBJECT
- 消息体
	- 消息本身
	- ASCII 字符

# 邮件格式
- 首部
	- TO 收件人，一个或多个【必填】
	- Subject 主题
	- Cc 给某人一个副本
	- From 发信人
	- Data 日期
	- Reply To 回应给
- 空白行
- 主体
## 多媒体邮件扩展 MIME

为了使 SMTP 协议能传输别的信息，拜托 ASCLL 码的限制
可以使用 MIME 技术将数据转化为 ASCLL 码形式传输
通过在邮件头部增加额外的行以声明 MIME 的内容类型
```
From: alice@crepes.fr
To: bob@hamburger.edu
subject: Picture of yurmy crepe.
MIME-Version: 1.o
Content-Transfer-Encoding: base64
Content-Type: image/jpeg

base64 encoded data .....
... . . .base64 encoded data
```
