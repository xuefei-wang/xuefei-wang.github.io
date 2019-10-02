# STDP Modeling

> Feldman DE. The spike-timing dependence of plasticity. *Neuron*. 2012;75(4):556–571. doi:10.1016/j.neuron.2012.08.001

**Selected examples illustrating each form are shown schematically. A**, Hebbian STDP that is equally balanced between LTP and LTD. 1, [Froemke et al., 2002](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R41). 2, [Fino et al. 2008](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R36). **B,** Hebbian STDP that is biased towards LTD. 3, [Celikel et al., 2004](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R19). 4, [Froemke et al., 2002](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R41). **C,** Anti-Hebbian STDP that contains both LTP and LTD. 5, [Fino and Venance, 2005](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R37). 6, [Letzkus et al. 2006](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R80). **D,** Anti-Hebbian STDP that contains only LTD (anti-Hebbian LTD). 6, [Han et al., 2000](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R56). 7, [Lu et al., 2007](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R89). 8. [Safo and Regehr, 2008](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3431193/#R116).



![1565057131146](C:\Blog\_posts\2019-08-06-STDP-modeling.assets\1565057131146.png)



## Hebbian STDP (balanced)







## Hebbian STDP (LTD-biased)







## Anti-Hebbian STDP (bidirectional)





## Anti-Hebbian STDP (LTD only)





TODO: read 6_, 7, 8

TODO: check out the spike-timing dependent plasticity in striatum paper, figure 4

TODO: spike frequency



```python
# tingley's settings
stdp_model = STDPMechanism(
                    timing_dependence=SpikePairRule(tau_plus=20.0, tau_minus=20.0,
                                                        A_plus=-0.001, A_minus=-0.0016),
                    weight_dependence=AdditiveWeightDependence(w_min=0, w_max=0.015),
                    weight=RandomDistribution('uniform',(0,lsInputThresh*2)),# 0.005,#RandomDistribution('lognormal',(np.log(lsInputThresh),lsInputThresh*100))
                    delay=7.0,#RandomDistribution('uniform',(7, 20)),
                    dendritic_delay_fraction=float(1))
```





```python
synaptic_parameters = {
    'excitatory': {
        'timing_dependence': {'tau_plus': 20.0, 'tau_minus': 20.0,
                              'A_plus': 0.01, 'A_minus': 0.012},
        'weight_dependence': {'w_min': 0, 'w_max': 0.04},
        'weight': 0.01,
        'delay': '0.1+0.001*d'},
    'inhibitory': {'weight': 0.05, 'delay': '0.1+0.001*d'},
    'input': {'weight': 0.01, 'delay': 0.1},
}
#https://github.com/NeuralEnsemble/PyNN/blob/2d5997f03a83ffd7fd15553f96df703efce04ae9/examples/stdp_network.py#L42
```

also check out this example: <https://github.com/NeuralEnsemble/PyNN/blob/2d5997f03a83ffd7fd15553f96df703efce04ae9/examples/simple_STDP.py>







# TODO

## ！run and plot tingley's figures





## ！numIterations





## ！runtime





## numcells





## ca1/ca3 weights



## synTheta ca1/3 difference?



## Field waveform





## offsets (from ca3 to ca1 continuous)





## 