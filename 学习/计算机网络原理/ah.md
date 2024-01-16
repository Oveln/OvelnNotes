---
aliases:
- null
create_date: 2023-02-09 12:46
tags:
- 学习/计算机网络原理
---
在 IP 数据报头中协议号为 51
提供源认证/鉴别，数据完整性检验
应用没有 ESP 广泛 w

# 传输模式 AH

IP 数据报的处理在主机中
AH 在原 IP 头和 IP 数据报载荷之间加入 AH 头
![[Pasted image 20230209133442.png]]
AH 头包括了一些认证数据：
- [[密码散列函数]] MAC 信息

# 隧道模式 AH

IP 数据报的处理在路由器中
AH 构建一个新的 IP 数据报，在新 IP 数据报头和原 IP 数据报中加入 AH 头
![[Pasted image 20230209133647.png]]