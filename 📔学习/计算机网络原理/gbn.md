---
aliases:
- Go-Back-N
- 回退N步协议
create_date: 2023-02-05 01:23
tags:
- 学习/计算机网络原理
---

# 发送方

分组头部包含 k-bit 序列号
窗口尺寸为 N，最多允许 N 个分组未确认

![[Pasted image 20230205012415.png]]

绿色：已经确认正确的序列号
黄色：未确认的序列号
蓝色：可用，未发送的序列号
白色：不可用的序列号

ACK (n) 表示确认到 n 为止的分组已经被正确接收

超时：重传序列号大于 n 的所有分组

## 自动机

![[Pasted image 20230205012809.png]] 

# 接收方

ACK 机制：发送拥有最高序列号的、已被正确接收的分组的 ACK

对于乱序到达的分组：直接丢弃，重新确认序列号最大的，按需到达的分组，如果期望收到 5，实际收到 7，则发送 ACK (4)
## 自动机
![[Pasted image 20230205013220.png]]


# 总结

发送方不断的发送窗口内的数据
接收方在接收到某个数据后，发送回最高有序分组的 ACK
发送方根据收到的 ACK 重新确认窗口的左端，然后发送窗口内的所有数据

在不断的发送接收过程中，整体窗口不断向右
最终把数据全部发送

# 缺陷

有很多重发的分组实际上被收到了，但是还是重发了
有一定的资源浪费