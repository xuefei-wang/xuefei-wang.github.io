---
layout: post
title: python module
---

# Tricky Python relative `import `

这两天写package折腾了一下python `import`，实在太恶心了



一般来说c/c++的逻辑就是非常直觉的，按照相对路径，绝对路径来引用，绝对路径指的也是相对于本文件位置的绝对路径。



python absolute import就不再赘述了，写全路径即可。

> 对于package来说，可以设置sys path（相当于install package）

python的import应该说可以分成两个种类：

- package内部的import
- 外部对于package的import



### package内部的import

folder --> package, subpackage, ...

file --> module

在python2里面是需要每个folder里面放一个`__init__.py`文件的，否则无法识别为package，python3某个版本之后好像取消了。

假设结构如下：

```
package
|
|--subpackageX
|  |--moduleA.py
|  |--moduleB.py
|
|--subpackageY
|  |--moduleC.py
|  |--moduleD.py
|
|--moduleE.py
```

- `moduleA.py` import `moduleB.py`:

  - `from . import moduleB`其中`.`表示当前文件夹，不能写`import .moduleB`

  - `from .moduleB import foo` 从moduleB里面引用这个函数

  

- `moduleA.py` import `moduleC.py`:

  - `from ..subpackageY import moduleC`

- `moduleA.py` import `moduleE.py`:

  - `from .. import moduleE`





### 外部对于package的import

使用package的文件一定要放在package外面，因为在执行的时候，是把当前执行的文件位置作为top level folder。比如A对E的引用是`from .. import moduleE`，只有当A在package外面的时候，编译器才知道`..`对应的是package的名字，因此这里的相对引用，在A执行的视角下，被解析为`package.moduleE`。



***执行package内部的文件**!!!!!!!

如果要执行package内部的文件，就无法把文件放到外面去了。

这时候的操作是：`python -m package.subpackageX.moduleA`。`-m`的意思是：-m mod : run library module as a script (terminates option list)。

这时候python会在执行之前把所有东西import好，也就是说相当于在package外面执行这个脚本，命名都是按照package外的视角，而非moduleA的所在文件夹视角（也就是说，对moduleB.py来说，它被看作`package.subpackageX.moduleB`而非是`.moduleB`）