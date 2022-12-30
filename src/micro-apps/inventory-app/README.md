# Setting up inventory categories

An inventory category is an item that can be acted on for sustainability. For example, business travel, fuel consumption etc.
An inventory category can be an item counted as scope 1, 2, 3 or any or all of these scopes.
An inventory category must be measurable

This micro application is to generate a set of qustionnairs that help us to build the ETL pipelines for the datasets required for the managment
of sustainability.

It is structured as

Dimensions:
    Scope (coporation, product, process)
        GHG Scope => 1 | 2 |3
            Industry => 
                Category => Carbon | Water | Waste
                    Standard and Regulation => 
                        Items 
                        Data sources
Measers:
    ?