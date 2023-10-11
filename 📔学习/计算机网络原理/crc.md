---
aliases:
- 循环冗余校验码
create_date: 2023-02-07 10:00
tags:
- 学习/计算机网络原理
---

# 简介

检错能力更强大的差错编码

# 实现

将数据比特 D 视为一个二进制数
选择一个 r+1 位的比特模式 G
目标：选择 r 位的 CRC 比特，R 满足
- <D,R>可以被 G 整除（模 2）

接收端检错，利用 G 除<D,R>，若全 0，无错，否则有错

可以实现检测所有突发长度小于 r+1 位的差错
![[Pasted image 20230207101035.png]]
我们期望
$$
nG = D\times 2^r\quad XOR\quad R
$$
相当于
$$
D\times 2^r=nG\quad XOR\quad R
$$
相当于

如果利用 G 去除 $D\times 2^r$，则余式为 R
$$
R=余式\left[  \frac{D\times2^r}{G} \right]
$$
