# EvCA

This repository contains the code for a cellular automata (CA) for modeling the evolution of dynamic-link network parameters as described in [PLK+22].

As an example, consider the following dynamic-link network topology (and related dynamic-
link parameters): 

![dynamic-link network](/figures/dln.png)

Let us focus on the parameter b (or p1). In this example, the bandwidth takes different values ranging from zero (white) to 255 (black). The darker the more bandwidth
is available on the link, ranging in different tones of gray. Therefore, for a randomly chosen initial configuration, the same cellular automaton yields the following pattern:

![random-initial-configuration](/figures/r-ca.png)


## References
[PLK+22] Erick Petersen, Jorge López, Natalia Kushik, Claude Poletti, and Djamal Zeghlache: On using Cellular Automata for Modeling the Evolution of Dynamic-Link Network Parameters. doi: https://doi.org/10.1109/NCA57778.2022.10013557
