---
layout: post
title: Context switch
---



# Context Switching & Mode Switching

## mode switching

单个进程来说，从user mode 到kernel mode

中断实现？？

通过system call来实现

而system call则是由软中断实现



实现步骤：

- save context(???)
- set the PC to the interrupt handler program
- switch to kernel mode

## context switching

在两个进程之间切换

场景主要有：

- multitask，通过时钟中断来操作
- 中断处理
- mode switching



步骤：

- save context
- update current PCB(Process Control Block)
- move current PCB to an appropriate queue(ready, blocked, ready-suspend)
- select a new process
- update new PCB
- update memory-management data structure(????)
- restore the context of new process







System calls in Linux are implemented through software interrupt, that is - switching between user mode to Kernel mode is achieved through interrupt.





## 三种进程切换的可能

外部中断

​	CPU之外的中断，异步，硬中断

​	e.g. 时钟中断，IO完成

内部中断

​	被CPU检查到，trap实现，同步，软中断

​	e.g. memory fault，访问越界

system call

​	自发，trap实现

