# What is SOLID in TS/JS?
A few terms to keep in mind before starting SOLID are the principle of least knowledge, coupling, and cohesion.

## Principle of least knowledge
Each unit (class, function, object, module) should have only limited knowledge about other units. This helps in the reusability maintainability of code.

## What is Low Coupling and High Cohesion?
- Coupling: The degree of direct knowledge that one element has of another is called coupling.
- Cohesion: Within a module, this measures how closely connected components are. It's a metric for how closely things resemble one another. Do you have a lot of stuff in here that's mainly about the topic at hand? Is there anything in here that belongs somewhere else?

Our software is composed of a bunch of unit classes or objects. An object encapsulates data and relevant methods related to data. Objects should be loosely coupled, i.e., they should be less dependent on each other. Each object should know less about another object. The same goes for different features or modules. S.O.L.I.D Principles help to achieve it.

- Feature: a collection of objects to perform a specific task is called feature (package).

## What are the S.O.L.I.D Principles and why do we need them?
These are a set of software design principles that instruct us on how to structure our functions and classes to make them as reliable, maintainable, and adaptable as feasible.

If the code you've built in the past doesn't meet your current needs, changing it can be costly. We want to jot down any code that will be altered. Changing your code a second, third, and fourth time should not add defects or make it difficult to scale your previous code.

SOLID stands for:

- S: <a href="https://github.com/Robert1802/JavaScript-SOLID/blob/master/1-S-Single-Responsibility-Principle.js">Single Responsibility Principle
- O: <a href="https://github.com/Robert1802/JavaScript-SOLID/blob/master/2-O-Open-Closed-Principle.js">Open-Closed Principle
- L: <a href="https://github.com/Robert1802/JavaScript-SOLID/blob/master/3-L-Liskov-Substitution-Principle.js">Liskov-Substitution Principle
- I: <a href="https://github.com/Robert1802/JavaScript-SOLID/blob/master/4-I-Interface-Segregation-Principle.js">Interface Segregation Principle
- D: <a href="https://github.com/Robert1802/JavaScript-SOLID/blob/master/5-D-Dependency-Inversion-Principle.js">Dependency Inversion Principle