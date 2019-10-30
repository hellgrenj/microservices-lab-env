# microservices lab environment

An environment for evaluating all things microservices. Built for developers.

## prerequisites
You need to have the following installed on your computer
* Docker
* Node.js

## init
``node scripts/init``

## structure
/services (this is where all the different microservices live)  
/deployment-strategies (different strategies demonstrated via kubernetes, the yaml files live in this folder)  
/patterns (docker-compose files for spinning up a specifik set on services in order to demonstrate a pattern)  
/scenarios (demo clients, UI-driven or API-consumer)  
/scripts (automation for this environment)  

## example

``node scenarios/demo-backend-for-front-end-pattern``

