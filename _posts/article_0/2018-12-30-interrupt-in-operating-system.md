---
layout: post
title: interrupt
---


#中断 Interrupt



中断是instruction cycle的一部分：

![1546141753081](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1546141753081.png)





如果



## 硬中断、软中断

软中断是执行中断指令产生的，而硬中断是由外设引发的。

硬中断的中断号是由中断控制器提供的，软中断的中断号由指令直接指出，无需使用中断控制器。

硬中断是可屏蔽的，软中断不可屏蔽。

硬中断处理程序要确保它能快速地完成任务，这样程序执行时才不会等待较长时间，称为上半部。

软中断处理硬中断未完成的工作，是一种推后执行的机制，属于下半部。 





## 时钟中断





## IO中断

发起：用户进程system call，