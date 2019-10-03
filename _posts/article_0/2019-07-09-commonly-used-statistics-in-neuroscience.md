---
layout: post
title: statistics
---

# Commonly Used Statistics in Neuroscience

## Anova

### One-way

有**一个**自变量x，**categorical**。因变量是**continuous**。

根据x分成几个group，看这几个group之间（在因变量y的**mean**上）有没有区别。

如果group个数大于2，没法知道到底是谁跟大家不一样，需要ad hoc test，比如：\TODO

> 我猜：一组人做不同的两件事，跟两组人做不同的两件事可能不一样\TODO
>
> categorical 准确来说，是nominal，就是没有高低排序关系（例如性别）。



### Two-way

有**两个**自变量x1，x2，**categorical**，**independent**。在two-way anova中也叫做factors。

一个因变量，**normal** distribution。

这里其实希望两个变量独立，然后可以分别看每个变量的effect，这个称之为main effect。

但是很可能两个变量不独立，其实假设就不成立了，main effect可能就不足以说明问题了；独不独立这个看的是interaction effect。



interaction term的画图表示方法：



> unbalanced dataset 处理方法：



### MANOVA

**多个因**变量

这个方法造了一个新因变量，是原来所有因变量的线性组合，maximize group differences。

感觉就是偷个懒，如果他们加起来有significance，那就值得每个看一看了。。

> 如果MANOVA不significant，会有单独的变量significant吗？





### Factorial Anova





