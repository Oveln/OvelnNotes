---
aliases:
- Selective-Repeat
- 选择重传协议
create_date: 2023-02-05 01:40
tags:
- 学习/计算机网络原理
---

改进了 [[GBN]] 的缺陷，接收方对每个分组单独确认，发送方只重传没收到 ACK 的分组
![[Pasted image 20230205014205.png]]
# 发送方

为每个分组单独设置定时器
对超时的分组进行重发
若收到的 ACK 为当前窗口左端，则将窗口右移至最近的未收到 ACK 的分组位置

# 接收方

若收到的分组在 ACK 窗口内，则对分组进行缓存并发送 ACK
若收到的分组在窗口的左端，则将窗口右移至最近的未收到分组位置

# 问题
序列号空间与窗口大小满足
$$
N_{s}+N_{R}\leq 2^k
$$
否则会出现情况
序列号空间为 0，1，2，3
接收方窗口为 0~2
发送方窗口为 2~0

```
012301230123   分组序列号序列
&&&xxx------   接收方
&&&&&xxx----   发送方
```
&：已接收分组，x ：当前窗口，-：窗口未到达分组
发送方发送序列号为 0 的数据，接收方不知道收到的数据是前一个序列号为 0 的数据还是后一个序列号为 0 的数据
# 总结

双方都存在窗口，随着信息的发送接收，窗口不断右移，最终信息传输完成