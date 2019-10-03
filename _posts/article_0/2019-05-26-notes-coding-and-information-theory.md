---
layout: post
title: information theory
---

# Information Theory and Coding



## 熵和互信息

### 熵

H(x)表示：uncertaity，也就是对这个信源进行采样获得的informaiton。每个个体的信息是$-log(p_i)$，熵值是所有个体的加权平均信息（以$p_i$为权）；（对均匀分布采样的时候，获得的信息最多）。

熵有一个特性：均匀分布的熵值，可以先分组抽样（$b_1, b_2, ..., b_k$），再在组内均匀抽样；这跟直接抽样的结果一样。（如果只分成两组的话，就是grouping axiom）

$H(\frac{1}{n}, .., \frac{1}{n})= H(\frac{b_1}{n}, .., \frac{b_k}{n}) + \sum_{i=1}^{k} \frac{b_i}{n} H(\frac{1}{b_i}, .., \frac{1}{b_i})​$

$\sum_{i=1}^{k} b_i = n$ 



>  熵值的单位取决于log的基，如果是binary，单位是bits





### 联合熵，条件熵，互信息

联合熵$H(X,Y)$:

对两个一起采样获得的信息不会超过单独对两个进行采样： $H(X,Y) \leq H(X) + H(Y)​$，$X​$和$Y​$独立的时候取等号。



条件熵$H(X|Y), H(Y|X)​$:

$H(X|Y)$：全局条件熵，一定小于等于$H(X)$，观察到Y之后，X里剩下的不确定度

$H(X|Y= y_i)$：局部条件熵，可能大于$H(X)$



$ H(X,Y) - H(X) = H(Y|X) ​$  观察到X之后，(X,Y)里面剩下的不确定度



互信息$I(X;Y) = I(Y;X)$

$$I(X;Y) = I(Y;X) \\ = H(X) - H(X|Y) \\= H(Y) - H(Y|X)$$







![1558885250687](C:\Blog\_posts\2019-05-26-notes-coding-and-information-theory.assets\1558885250687.png)![1558885486171](C:\Blog\_posts\2019-05-26-notes-coding-and-information-theory.assets\1558885486171.png)



## 信源编码

### 编码效率

信源熵$H(x)$，平均码长$\overline{k}$，编码效率：$\mu = H(x)/\overline{k}​$

平均码长就是各个码字长度$k_i$的加权平均，权是$p_i$



### 常见编码

分组码（block code）：码长相同

即时码（instantaneous code）：一边传输过来，一边就能译码，不用等到全部数据都传输完成；前缀定理（prefix property），画一个树，来构造



#### 香农码

从大到小排，-logp<=K<-logp+1，计算K，然后根据累加概率（第一个对应的累加概率为0）的小数点后表示，取K位，从上往下取码字

#### 费诺码

从大到小排，每次分两组，使概率尽可能相等，分别授予0和1，如此重复，从前往后取码字

#### 霍夫曼码

从大到小排，取最概率最小的两个字母分别给0，1，把他们概率相加作为一个新的概率， 加入其他字母，重新排队（一般将合并的概率放在上面，这样可获得较小的码方差），从后往前取码字

> 最佳编码：optimal r-ary encoding scheme，平均码长最小。



### Kraft不等式（唯一可译码存在条件）

唯一可译码**存在**的充分必要条件：（存在！！而不是用来判断某个码**是不是**唯一可译码，一般来计算能不能构造**即时码**）

码字个数$n​$，第$i​$个码字长度$K_i​$，基$q​$，不等式：$\sum_{i=1}^{n}m^{-K_i} < 1​$





### Noiseless Coding Therom

 平均码长：$\overline{k} = \sum_{i=1}^{n} p_i log_r\frac{1}{p_i}​$

熵值：        $H(x) = \sum_{i=1}^{n} p_i k_i ​$

通过好的coding scheme，可以使平均码长尽可能接近熵值：$H(X) \leq \overline{k} \le H(X) + 1$ 



# 信道编码



### 编码表示

一般的码(n,M,d) 

​	n：码长，M：码字个数，d：最小距离，q：基（ary）没有写出来

线性码[n,k,d] 

​	k：信息位个数，$M=q^k​$

w：最小距离



### 信道矩阵

一般表示为：

![1560261417112](C:\Blog\_posts\2019-05-26-notes-coding-and-information-theory.assets\1560261417112.png)



### 码率

rate of transmission

$k​$是信息位，基（输入符号集个数，比如二元$s=2​$，符号包括${0，1}​$）为​$s​$，这个码可以有$|C|​$个码字：

$|C| = s^k, k = log_s|C|$，码长为$n$，则码率$R = k/n$

比如：一组偶检验的码：000，011，101，110，前两位是信息位，$k=2​$，码字个数$|C| = 2^2=4​$用

 $n=3$的长度来编码，码率$R=2/3$。





### 信道容量

遍历输入分布，互信息最大 $C = max_{P(X)}\{ I(X;Y) \} $

​	对称信道：$$C = logt - \Sigma_{j= 1}^{t}p(y_j|x_i)log\frac{1}{p(y_j|x_i)}$$，t是输出符号的个数，当均匀分布的时候取这个值；二元对称信道（p,1-p）：$C = 1-H(p)$



### Decision Scheme3

通过输出去猜最有可能的输入

Ideal oberserver: $c = argmax_{c}{p(c|d)}$ 就是最理想的情况

Maximum Likelihood Estimation: $c = argmax_{c}p(d|c)​$ 通过前向概率（信道概率），来猜，如果是均匀分布，就跟理想观察者一样



### Noisy Coding Theorem

希望创建一个error趋近于0的码，码率R趋近C即可，而非0，也就是说，希望错误无限小，不需要码长无限大。

```
TODO: insert a figure from ipad
```





### 完备码

perfect code

所有发生错的码都可以纠正到一个码字上去，装球半径（保证球互不相交） = 覆盖半径（保证所有元素都在某个球里）

装球定理：完备码 iff d是奇数，M = 球大小*球个数



### 系统码

存在几个位置是信息位（000，011，101，110，第一二个位置是信息位，包括了所有可能的组合00，01，10，11）





### 线性码

[n,k,d]

L是一个线性空间

w(L) = d(L)

对于线性码而言

​	L：生成矩阵 $G = [I_k  | A ]​$，校验矩阵 $H = [A^T  | I_{n-k}]​$

​	L的对偶：生成矩阵$H$，校验矩阵$G​$

d = 校验矩阵H中最大的线性不相关的列的集合大小+1，就是一个code*H就等于这个code为1的位置对应的H中的列，加在一起。如果这些列加起来是0的话（线性相关），那么这个code就在L里面，而搜索所有code，能够使之为零的里面，weight最小的，就是d。





