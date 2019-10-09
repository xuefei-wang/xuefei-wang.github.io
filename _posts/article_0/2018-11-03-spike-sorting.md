---
layout: post
title: spike sorting procedure
---

Brief notes about spike sorting procedure



### Filtering

bandpass filter, frequency range: (300-400, 4000-7000)

typically, FIR(Finite Impulse Response) type



### Spike Detection

auto threshold: 5*standard deviation, `median(abs(x)/.6745) `

e.g. 11+21 samples before and after peak 

> what if the overlap in time?



### Extract Spike Features 

This is actually dimensionality reduction.

#### 1. Choose from meaningful measurements:

- peak amplitude
- trough amplitude
- crest-to-trough amplitude
- width
- rise slope
- fall slope
- energy/power/rms
- ...



#### 2. PCA

#### 3. discrete wavelet transform



### Clustering

- K-Means

- Fuzzy C-Means

- Hierarchical

- SPC



### Measure of Unit Quality

Lratio & Isolation Distance

*problem: normality is assumed.*



### Sorting Bias & Confounds

- neuron bursting 
- waveform overlaps of near-synchronous spikes
- back-propagation of dendritic action potentials 
- time-delayed action potentials
- electrode drift
- biophysiological difference across brain regions



### Ground Truth Dataset to play with

- Harris 2000

- Neto 2016 MEA data

- Brain Allan Boyden MEA data