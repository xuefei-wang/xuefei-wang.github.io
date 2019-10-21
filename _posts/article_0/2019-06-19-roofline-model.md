---
layout: post
title: roofline model
---

# Roofline 模型

这实际上就是一个可视化模型，作用在于：展示计算平台的计算能力。

影响计算能力主要有两方面：

- 算力 $\pi$ ：性能上限，指的是一个计算平台倾尽全力每秒钟所能完成的浮点运算数。单位是`FLOP/s`。决定屋顶高度

- 带宽 $\beta$ ：带宽上限，指的是一个计算平台倾尽全力每秒所能完成的内存交换量。单位是`Byte/s`。决定房檐斜率

- 计算强度上限 $I{max}$ ：两个指标相除即可得到计算平台的计算强度上限。它描述的是在这个计算平台上，单位内存交换最多用来进行多少次计算。单位是`FLOP/Byte`。

  ​	$I_{max } = \frac{\pi}{\beta}​$



有了计算平台的这个性能描述之后，我们要做的是拿一个模型，来查一查，它在这个平台上能做的多好。

模型对应算力、带宽分别有自己的两个属性值：计算量，访存数；这两个的比值就是计算强度$I$。

每个模型都有自己的计算强度$I$ ，对照这个表，可以找到该模型性能的上限。如果$I< I_{max}$，这时候memory-bound，已经充分利用了带宽；当$I > I_{max}$时，compute-bound，已经充分利用了计算能力，。

![img](C:\Blog\_posts\2019-06-19-roofline-model.assets\20180322131317429)