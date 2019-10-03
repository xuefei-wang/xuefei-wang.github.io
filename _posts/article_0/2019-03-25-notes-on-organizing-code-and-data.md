---
layout: post
title: data/code organization
---



# Notes on Organizing Code and Data



## use consistent and meaningful naming scheme

don't confuse your future self

## keep code and data separate

```
/code
/data
	/input
	/working
	/output
```



## modify data with good documentation

use git 

do not modify data by hand, if so, document it thoroughly

save all the parameters and options, you can establish a fixed structure/file to automatically do this

and safe new versions separately from the old ones, in case you accidently erase something important

## save to disk frequently

separate by date and dataset



## keep all portions executable separately 

if they are organized sequentially

write a script to do this rather than comment out each segment every time



## make sure the failure during execution does not result in serious result

save the state automatically

resume execution from that state

and print out something so that you can visually recognize both 


