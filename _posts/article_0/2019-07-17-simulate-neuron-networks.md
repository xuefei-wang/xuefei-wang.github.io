---
layout: post
title: simulation neurons
---

# Simulate Neuron Networks

> python package: PyNN
>
> <http://neuralensemble.org/docs/PyNN.html>
>
> simulator-independent language (NEURON, TEST, Brain), support modeling at a high-level abstraction



## Installation

you have to install neuron before pynn.... this is really weird

and there's no neuron package for python on windows platform...

update[2019/09/23]: Now they have windows support for Neuron package. Go to their website and download it before installing pyNN.



## Simulation Control

```python
setup(timestep=0.1, min_delay=0.1, max_delay=10.0)
run(100.0) # run for 100 ms
end() # finish up the simulation

reset() # reset time to zero and run a new simulation with the same network
```

`run` has a parameter called `call_back`, which is pretty interesting:

TODO: read about call_back functions later

> callbacks is an optional list of callables, each of which should accept the current time as an argument, and return the next time it wishes to be called.



### Break a run into several steps

if you wish to show some information or perform some calculation during a run.

```python
>>> for i in range(4):
...    run_until(100.0*i)
...    print("The time is %g" % (100*i,))
The time is 0
The time is 100
The time is 200
The time is 300
```

```python
>>> def report_time(t):
...     print("The time is %g" % t)
...     return t + 100.0
>>> run_until(300.0, callbacks=[report_time])
The time is 0
The time is 100
The time is 200
The time is 300
300.0
```

## Obejcts

### Neurons

There are some provided standard neuron templates.

> <http://neuralensemble.org/docs/PyNN/standardmodels.html>

``` python
['IF_cond_alpha', 'IF_curr_exp', 'IF_cond_exp', 'EIF_cond_exp_isfa_ista',
 'SpikeSourceArray', 'HH_cond_exp', 'IF_cond_exp_gsfa_grr',
 'IF_facets_hardware1', 'SpikeSourcePoisson', 'EIF_cond_alpha_isfa_ista',
 'IF_curr_alpha']
```

This website shows part of the models's response to current injection [http://neuralensemble.org/docs/PyNN/examples/cell_type_demonstration.html].

Two of them are spike sources instead of neuron models: `SpikeSourceArray`, `SpikeSourcePoisson`. They should be implemented as spike, but their function is to 'ensure the connected neuron fires at exact multiples of the firing period'. (see p3 population in http://neuralensemble.org/docs/PyNN/examples/simple_STDP.html for example)

### Population

A group of neurons = number + neuron type, with optional params:

- structure
- initial values
- label

> my notes: like `list` object in python



### View

- subset of **population**
- returns a **populationview** object, refers to the same object, not a copy
- can be used in projection
- can be combined with other **population** or **populationview** objects to create **assembly**

applicable: python slicing and indexing notation

```python
id = ctx_cells[47]           # the 48th neuron in a Population
view = ctx_cells[:80]        # the first eighty neurons
view = ctx_cells[::2]        # every second neuron
view = ctx_cells[45, 91, 7]  # a specific set of neurons
view = ctx_cells.sample(50, rng=NumpyRNG(seed=6538))  # select 50 neurons at random

view.parent					 # reference to the 'populaiton' obeject being viewed
view.mask				     # indices of the neurons in the view
```





### Assembly

`Assembly` is an aggregate of `Population` and `PopulationView` objects, and as such can represent a heterogeneous collection of neurons, of **multiple cell types**. 

```python
# two ways of creating assembly
all_cells = tc_cells + ctx_cells
all_cells = Assembly(tc_cells, ctx_cells)
```

Each collection can be accessed via their labels: 

```python
all_cells.get_population("Thalamocortical neurons")
```



### Initialize and inspect parameter values

`set()`

`get()`

`initialize()`

inspect: 

```python
ctx_cells.celltype.default_initial_values
```



### Inject Current into neurons

different current types:

`current.inject_into(cells)` or `cells.inect(current)`



### Recording Variables

Recording:

```python
all_cells.record('spikes')
ctx_cells.sample(10).record(('v', 'w')) #, sampling_interval=0.2)
```

Retrieve the recorded data / Directly write data to file:

```python
data_block = all_cells.get_data()
```

```python
from neo.io import NeoHdf5IO
h5file = NeoHdf5IO("my_data.h5")
ctx_cells.write_data(h5file)
h5file.close()
```

check out variables that can be recorded:

```python
ctx_cells.celltype.recordable
```



### Working with Individual Neurons

```python
a_cell = tc_cells[47] # ID object
a_cell.parent.label 
tc_cells.id_to_index(a_cell) # ID back to index
```





## Connections

其实神经元之间的连接是projection，然后projection需要synapse和connector

### Synapses

- fixed, `StaticSynapse`

- short-term synaptic plasticity, `TsodyMarkramSynapse`

- STDP, `STDPMechanism`

  - `timing_dependence` component

    - `SpikePairRule`(*tau_plus=20.0*, *tau_minus=20.0*, *A_plus=0.01*, *A_minus=0.01*)

      

  - `weight_dependence` component

  - `voltage_dependence` component

  



### Connector

base class: `Connector`, and implement a `connect()`, takes  `Projection` object as its single argument

- all-to-all
- one-to-one, must have the same size
- FixedProbabilityConnector
- IndexBasedProbabilityConnector
- DistanceDependentProbabilityConnector, require a string 'd_expression' to calculate the distance,distance is specified by a `Space` object
- FixedNumberPostConnector, randomly choose n 
- FixedNumberPreConnector
- smallNetwork

Or to specify a list of connections: 

```python
connections = [
  (0, 0, 0.0, 0.1),
  (0, 1, 0.0, 0.1),
  (0, 2, 0.0, 0.1),
  (1, 5, 0.0, 0.1)
]
connector = FromListConnector(connections, column_names=["weight", "delay"])
```

```python
connections = [
  (0, 0, 0.0, 0.1),
  (0, 1, 0.0, 0.1),
  (0, 2, 0.0, 0.1),
  (1, 5, 0.0, 0.1)
]
connector = FromListConnector(connections, column_names=["weight", "delay"])
```



### Projection

a set of connection between two groups of neurons

arguments:

- pre population
- post population
- `connector`
- `synapse_type`

optional:

- `receptor_type`, name of the post-synaptic mechanism, e.g. `excitory`, `inhibitory`, `NMDA`
- label
- `Space` to determine the distance

```python
excitatory_connections = Projection(pre, post, AllToAllConnector(), StaticSynapse(weight=0.123))
```

> My  notes: 
>
> `projection `是真正的connection between cells，`connector`表示了pre和post连接的方式；`synapse_type`表征了plasiticity，大小的变化，增强还是削弱，`receptor_type`表示了方向的变化。
>
> TODO: check out NMDA receptor



To retrieve attributes: 

​	`Projection.get(param, format='list'/'array')`

To modify attributes:

​	`Projection.set(param1=xxx,param2=xxx,....)`



That is basically for inter-population connection.

For intra-population, just set both pre-/post- to the same population. 

> For `AllToAllConnection`, there is a `allow_self_connections` flag:
>
> if the connector is used to connect a Population to itself, this flag determines whether a neuron is allowed to connect to itself, or only to other neurons in the Population.



## Space

TODO





## Current

`CurrentSource` class, see figures in <http://neuralensemble.org/docs/PyNN/injecting_current.html>

- `DCSource`
- `ACSource`
- `StepCurrentSource`, offset means offset in y-axis (unit nA); phase means offset in x-axis (unit degrees)
- `NoisyCurrentSource`

or, to implement your own current source:

Note: `plt.plot(current.times, current.amplitudes)` to check out the waveform



## Record spikes and state variables

The classes `Population`, `PopulationView` and `Assembly` all have a `record()` method, which takes either a single variable name or a list/tuple of such names

```python
population.record(None)   # reset recording for this population
population.record('v', sampling_interval=1.0) # record at a lower frequency

#save data
population.write_data() # at the end of the simulation to collect data

# an alternative syntax:
record(['v', 'spikes'], population, filename="output_data.pkl")

# to retrieve saved data
get_data()
```





## Data Handling

> <http://neuralensemble.org/docs/PyNN/data_handling.html>

Neo package:

Block

Segment

AnalogSignal & SpikeTrain





