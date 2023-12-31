---
aliases:
- null
create_date: 2023-02-07 08:39
tags:
- 学习/计算机网络原理
---
# 简介
CA（数据帧冲突避免）
并不能像 [[CSMA-CD协议]]一样边发送边检测冲突
- 无线信道很难实现
- 无法侦听到所有可能的冲突：隐藏站、信号衰落
![[Pasted image 20230207083801.png]]
C 和 B 可以通信，B 和 A 可以通信，但 A 和 C 无法通信
就会产生，A 和 C 都与 B 通信，同时 A 和 C 都认为信道是空闲的

# 基本思想

允许发送端预约信道，而不是随机发送数据帧
避免长数据帧的冲突

DIFS：分布式帧间隔帧
RTS：请求发送控制帧
SIFS：短帧帧间隔
CTS：允许发送控制帧
NAV：网络分配向量

- 发送端首先利用 CSMA 向 BS 发送一个很短的 RTS（请求发送控制帧）帧
	- RTS 可能彼此冲突（但很短）
- BS 广播一个 CTS （clear to send）作为对 RTS 的响应
	- 告知发送 RTS 的发送端可以发送
	- 告知别的发送端，信道被占用
	- 如果 BS 同时收到多个 RTS，则不进行回应
		- 各个发送端会各自等待随机时间，之后再次发送 RTS
		- 保证下次不会同时发送RTS
- 别的发送端进行等待知道 BS 广播 ACK
	- 说明传输结束，可以进行 RTS 预约


- CTS 帧可以被所有结点接收
	- 消除隐藏站影响
	- 发送端可以发送数据帧
	- 其他节点推迟发送
利用很小的预约帧，避免了数据帧冲突
![[Pasted image 20230207090113.png]]

# MAC 帧
![[Pasted image 20230207090340.png]]
| 名称          | 含义         |
| ------------- | ------------ |
| duration      | 预约上传时间 |
| seq control   | 帧序号       |
| frame control | 帧控制，见下   |
| address       | 地址，见下         |

![[Pasted image 20230207090509.png]]
| 名称      | 含义                          |
| --------- | ----------------------------- |
| Version   | 协议版本                      |
| Type      | 帧类型（RTS，CTS，ACK，data） |
| To AP     | 去向 AP                       |
| From AP   | 从 AP 来                      |
| More frag | 是否是分片                    |
| Retry     | 是否重传帧                    |                               |
![[Pasted image 20230207090730.png]]
如果数据帧从 AP 发出，地址 1 为目的地址，地址 2 为 AP 地址，地址 3 为源地址
如果数据帧去往 AP，地址 1 为 AP 地址，地址 2 为源地址，地址 3 为目的地址
此处地址都是 MAC 地址
地址 4 用于自组网

## 例子
![[Pasted image 20230207091058.png]]
H1 向 AP 发送帧，AP 将数据帧信息转换成 802.3 帧送给路由器