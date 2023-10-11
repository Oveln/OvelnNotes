---
create_date: 2023-01-30 22:26
tags: '学习/计算机网络原理'
---

广泛用于无线链路共享

每个用户分配唯一的 m bit 的码片序列，其中 0 用-1 表示，1 用+1 表示
例如 S 站的码片序列（-1-1+1+1-1+1-1+1）
各用户使用相同频率载波，但需要用户利用各自的码片序列编码数据
$$
编码信号=原始数据\times（码片序列）
$$
如发送 1，则发送自己的 m bit 的码片序列
如发送 0 ，则发送自己的 m bit 的码片序列的反码

各用户的码片序列互相正交
$$
\frac{1}{m}S_{i}\cdot S_{j}=\begin{cases}
1, i=j  \\
0, i\neq j
\end{cases}
\quad\quad
\frac{1}{m}S_{i}\cdot \bar{S_{j}}=\begin{cases}
-1, i=j  \\ 
0, i\neq j
\end{cases}
$$

可以保证个用户共享信道，互不干扰

令 $\{ d_{i} \}$ 为 i 用户的原始数据，所有的用户数据相互叠加向量为
$$
P=\sum_{i=1}^N d_{i}\cdot S_{i} = \sum_{i=1}^N \bar{S_{i}}
$$
解码：码片序列与编码信号的内积
$$
\frac{1}{m}S_{i}\cdot P=\begin{cases}
1\quad S_{i}\in P \\
-1\quad \bar{S_{i}}\in P \\
0\quad S_{i},\bar{S_{i}} \notin P
\end{cases}
$$
因为
$$
\frac{1}{m}S_{i}\cdot P = \frac{1}{m}S_{i}\cdot(d_{i}+(P-d_{i}))=\frac{1}{m}\cdot d_{i}+(0)
$$
