---
layout: post
title: DTW
---

# Dynamic Time Warping 

> Abdullah Mueen, Eamonn J. Keogh: Extracting Optimal Performance from Dynamic Time Warping. KDD 2016: 2129-2130 



## Advantages

In conjunction with simple techniques, such as z-normalization, DTW can provide several invariances like amplitude, offset and the warping (or local scaling) itself

> Silva, D. F., Batista, G. E. A. P. A., & Keogh, E. (2016). On the Effect of Endpoints on Dynamic Time Warping. SIGKDD MiLeTS’16. https://doi.org/10.1145/12345.67890



## DTW normalization

 (for each epoch)

- z-norm* is better for most cases

- max-norm



## Variants of DTW

- LCSS alignment: with some points allowed to be unmapped

- assign more weights to diagonal step and discourage the path wandering too far from the diagonal. even create asymmetric step patterns



## Details



### W

w: the constraint of deviating from diagonal, which can greatly affect the performance

for nearest neighbor classification, a small w is preferred. Typically smaller than 10%.

> Ratanamahatana, C. A. and Keogh, E. 2005. Three Myths about Dynamic Time Warping Data Mining. In Proceedings of the SIAM International Conference on Data Mining. SDM’05. SIAM, 506-510.
> [18]

![1542791374710](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1542791374710.png)



![1542791781705](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1542791781705.png)



###different lengths 

1. just compare them, because DTW can handle the local scaling
2. re-interpolate them to have the same length

--> Empirically makes little or no difference for classification and clustering





### Endpoint

is very important!!!

![1542794505141](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1542794505141.png)

possible fixes(It's still an open question):

1. subsequence extraction algorithm

2. multiply the first and last r elements of the path by a weight

3. open-ended warping

   Change…
   `Boundary conditions: w1 = (1,1) and wK = (m,n), this requires the warping path to
   start and finish in diagonally opposite corner cells of the matrix.`
   …to
   `Boundary conditions: w1 = (1,B) or (B,1) and wK = (m-C,n) or (m,n-C), with 0 ≤ B ≤ r,
   and 0 ≤ C ≤ r this requires the warping path to start and finish in a cyan cell.`

   ![1542794821290](C:\Users\Fei\AppData\Roaming\Typora\typora-user-images\1542794821290.png)r is the relaxation factor parameter


> Silva, D. F., Batista, G. E. A. P. A., & Keogh, E. (2016). On the Effect of Endpoints on Dynamic Time Warping. SIGKDD MiLeTS’16. https://doi.org/10.1145/12345.67890





## Multi-Dimensional DTW

Two ways:

- independent: just add them - loosely coupled
- dependent: create a single matrix (squeeze the dimensions) - tightly coupled





## Similarity



> How to turn dissimilarity into similarity？
>
> https://cs.stackexchange.com/questions/53250/normalized-measure-from-dynamic-time-warping









## Notes

- open end

  ​	check the DTW tutorial

- z-normalize

- independent & dependent 
  - for independent, see how to choose the best dimension???????????????????

  - for dependent,  there's no need to normalize/standardize the data

    drop dimensions if the variance of that dimension is below certain threshold

    >  Multi-Dimensional Dynamic Time Warping for Gesture Recognition



- noise-robust

  simply using a Gaussian smooth(check scipy)

  >  https://docs.scipy.org/doc/scipy-0.15.1/reference/generated/scipy.ndimage.filters.gaussian_filter1d.html


