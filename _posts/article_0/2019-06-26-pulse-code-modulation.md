---
layout: post
title: PCM
---

# PCM Terminology and Concepts

> <https://larsimmisch.github.io/pyalsaaudio/terminology.html>



## Pulse-Code Modulation

PCM: a method used to digitally represent sampled analog signals. standard form of digital audio in computers, compact discs.

typically linear ones.



## Concepts

### sample

amplitude 某个声道，在某个时间点的幅值

precision: 8-64 bit, can be floating point numbers, byte integers (big endian or little endian)



### frame

就是一个时刻所有channel的sample

对于单声道(mono)，一个frame就是一个sample

对于双声道(stereo)，一个frame包含两个sample



### Rate

frame的rate，比如8000hz说明1秒有8000个frame



### Data Rate

number of bytes

每秒有多少数据

 = frame_rate * bit_per_sample * sample_per_frame (or num_channels)





