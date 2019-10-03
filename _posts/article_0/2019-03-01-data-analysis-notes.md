---
layout: post
title: data analysis techniques
---

Four classes of Algorithms:

 1) Bagging of SVMs 2) RandomForest 3) Neural Networks 4) LinearModels

**Pick a robust methodology.** Here is the tricky part which depends on experience, even if you have done cross validation, you can still get burned: Sketchy methods of improving the CV score like making cubic features, cubic root features, boosting like crazy, magical numbers(without understanding it), etc, will likely be a bad model to pick even if the CV score is good. Unfortunately, you will probably have to make this mistake once to know what this means



check for duplicate entry

check for outliers (extraordinary 'Y' values)

check variables 'X's and how they correlate with 'Y'

```
what should i do here?
This helps determine how to do feature engineering.For example, creating two groups one for good selling month, another for all others
     # Months with the largest number of deals may be significant.
        all_df["HighSeason"] = df["MoSold"].replace( 
            {1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0})
```



check correlation between variables if necessary

```
what should i do here?
```



distinguish between categorical variable and numerical variable(sometimes, numerical is actually categorical. Sometimes change categorical to numerical keeps the information in their order) actually we can separate them in the first place, and concatenate them later

> in python&pandas, this can be done like this:(take care to exclude 'Y')
>
> ```python
> categorical_features = train.select_dtypes(include = ["object"]).columns
> numerical_features = train.select_dtypes(exclude = ["object"]).columns
> ```

fill missing values:

> for some, mean/media/most-common-value makes sense
>
> for others, maybe add new category or somthing

feature engineering: 

- simplify existing features
- combine existing features
- create new features on top-correlation (with 'Y') features, ^2, ^3, sqrt...

> don't make interaction with dummy variables(0,1)!

```
why polynomials?
```



log-transform

```
why take log transformation?
	log transformation can decrease the variability of data and make data conform more closely to the normal distribution, lessen the impact of outliers(skewness > 0.5 is skewed)
	make relative comparison rather than absolute comparison
```



create dummy variables via one-hot encoding



partition

> train_test_split()



normalize

> fit the StandardScaler model on training data, and fit it on test data. do partitioning before normalizing
>
> do not z-normalize categorical variables
>
> normalize after polynomial features/create interaction features

```
why z-normalize features?
	because it helps to make the coefficient meaningful. (not the case for decision tree and random forest)
	
why not z-normalize categorical features?
why z-normalize after generating polynomial/interaction features?
```



define a scorer, a regularization term and a model

> regularization help avoid unstable state introduced by variable correlation, e.g. one large positive coefficient is cancelled by another large negative coefficient. And regularization helps prevent that
>
> elasticnet is a compromise between L1(Lasso) and L2(Ridge) regularization

```
if regularization is used, is it necessary to deal with correlated variables in the beginning?

what's the difference between L1 and L2 regularization?
In contrast to L2 regularization, L1 regularization yields sparse feature vectors : most feature weights will be zero. Sparsity can be useful in practice if we have a high dimensional dataset with many features that are irrelevant.

why L2 is called Ridge?

```



determine parameters, find the best and perform a more precise search around the now-best parameter







L1 v.s. L2

| Usage               | L2                        | L1                                 |
| ------------------- | ------------------------- | ---------------------------------- |
| Regularization term | computationally efficient |                                    |
|                     |                           | sparse(feature selection)          |
|                     | solution uniqueness       |                                    |
| Loss function       |                           | robust(less sensitive to outliers) |
|                     | stable soution            |                                    |
|                     | solution uniqueness       |                                    |
|                     |                           |                                    |

```
what's the differences between stability and robustness?
```





