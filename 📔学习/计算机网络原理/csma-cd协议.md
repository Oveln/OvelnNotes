---
aliases:
- 带冲突检测的CSMA协议
create_date: 2023-02-07 06:38
tags:
- 学习/计算机网络原理
---
# 简介

在发送数据帧时，同时进行冲突检测，在冲突发生后，立刻停止发送

对于有线局域网，易于实现，测量信号强度，比较发射信号与接收信号
但对于无线局域网，很难实现，接收信号强度淹没在本地发送信号强度下

CSMA-CD 的工作周期就是**传输周期、争用周期、空闲周期**交替出现的过程
# 实现
二进制指数退避算法

1. [[NIC]] 从网络层接收数据报，创建数据帧
2. NIC 监听信道，如果 NIC 监听到信道空闲，则开始发送帧
3. 如果监听信道忙，则等待到信道空闲，然后发送帧
4. NIC 发送完整个帧，而没有检测到其他节点的数据发送，则 NIC 确认帧发送成功
5. 如果 NIC 检测到其他节点传输数据，则终止发送，并发送阻塞信号
6. 终止发送后，NIC 进入二进制指数退避
	1. 第 m 次冲突后
	2. 去 n=min (m, 10)
	3. NIC 从 $\{ 0,1,2,\dots,2^n-1 \}$ 中随机选取一个数k
	4. 网卡等待 $k\times 512 bit$ 的延迟时间，再返回第 2 步

连续冲突次数越多，平均等待时间越长，若冲突次数过多，则直接向上层协议报错，不再进行尝试

# 数据帧最小长度

设网络带宽 R bps
数据帧最小长度 $L_{min}$
信号传播速度 V（m/s）
![[Pasted image 20230207113944.png]]
考虑极端情况，A 的信号刚刚要到达 B，B 发送了信号
过了一瞬间，B 发现冲突，停止发送数据帧，但 A 还需要 $\frac{d_{max}}{V}$ 的时间才能发现
但如果 A 在这个时间内停止数据传输，就不会知道产生了冲突
导致实际上 A 的数据没有被 B 接收，但 A 认为被接受了
所以数据帧最小长度要满足$$
\frac{L_{min}}{R}\geq \frac{2d_{max}}{V}
$$
即 $$
\frac{L_{min}}{R}\geq RTT_{max}
$$
# 效率

$T_{prop}=LAN中2个结点最大传播延迟$
$t_{trans}=最长帧传输延迟$
$$
效率=\frac{1}{1+\frac{5t_{prop}}{t_{rans}}}
$$
当 $t_{prop}趋近于0或者t_{trans}趋近于无穷，效率趋近于1$

远远优于 ALOHA，并且简单，分散