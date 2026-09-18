# Researching adversarial robustness in weather-forecasting ensembles

I have started my PhD in Computer Science at Michigan State University, where I am a Graduate Research Assistant in the Data Mining Laboratory with Dr. Pang-Ning Tan.

My research studies adversarial attacks on ensemble deep-learning weather-forecasting models. An ensemble does not produce one forecast. It produces a distribution of plausible futures, including information about spread, uncertainty, and the probability of threshold events.

That creates a problem that pointwise accuracy can miss. A small, constrained perturbation to the observed input may leave the ensemble mean nearly unchanged while altering its spread, tail probabilities, or a downstream decision. In other words, a forecast can remain superficially accurate while becoming overconfident or unreliable where decisions matter most.

The project will compare attacks that target individual members, ensemble statistics, the full predictive distribution, event probabilities, and downstream decisions. The evaluation will move from compact stochastic forecasting models to learned weather ensembles, with tests across model structure, ensemble size, forecast horizon, and attack access.

The goal is not only to show that attacks exist. It is to define measurable robustness criteria and test defenses that preserve calibrated uncertainty under attack. This includes ensemble-aware adversarial training, randomized smoothing, inconsistency detection, and diversity across members and models.

This work connects adversarial machine learning with trustworthy probabilistic forecasting: a useful weather model should remain reliable not only in its average prediction, but also in the uncertainty it communicates.
