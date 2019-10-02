## linear model

in the form of: y = ax+b





## Generalized Linear Model

'generalized' in 3 ways:

- in basic version, (y - y^) ~ gaussian, but here y can be any exponential family
-  predictor variable is also not limited to a single x: e.g. x1,x2,x3 / x, x^2 / ...
- link function, f(y) = ax+b

> I feel like the y noise distribution & link function



## Generalized Linear Mixed Model

mixed: fixed effect + random effect, the old variables is called fixed effect, and they take into account the effect of different subjects

For example:

`weight ~ height + age + gender + (height + age | subject)`

fixed: height, age, gender

random: (height + age | subject), this will add three weightings: 1. base subject (dummy variable coding) 2. subject on height (a vector, containing each individual's difference from mean height) 3. subject on age (same as 2)

