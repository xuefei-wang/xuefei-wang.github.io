---
layout: post
title: microcontroller protocols
---

# Microcontroller Protocols

## I2C

![1559728346717](C:\Blog\_posts\2019-06-05-microcontroller-protocols.assets\1559728346717.png)

two buses, many masters, slaves on it, can transfer data to each other

Slave to Master:

- start bit(1 bit, SDA a little earlier than SCL)

- control byte(device address, choose among all devices on the buses,7 bit)

- read/write bit(1=read)
- acknowledge bit <-- 

![1559727347711](C:\Blog\_posts\2019-06-05-microcontroller-protocols.assets\1559727347711.png)

Master to Slave:

- pause bit
- 

Signals: 

​	SCL: Clock -->

​	SDA: Data <-->

## SPI

![1559728363991](C:\Blog\_posts\2019-06-05-microcontroller-protocols.assets\1559728363991.png)

Master ---- Slave1,2,3...

Signals:

​	SCK: Serial Clock -->

​	MISO: Master In Slave Out <--

​	MOSI: Master Out Slave In -->

​	Slave Select -->



Mode

​	![1559723933319](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1559723933319.png)



## UART

asynchronized, no clock

peer to peer

two buses, TX, RX, not but difference

receiver and transmitter should have the baudrate

- start bit
- data bit
- parity bit
- stop bit

