# microservices lab environment

An environment for evaluating all things microservices. Built for developers.

## prerequisites
You need to have the following installed on your computer  
- Docker  
- Node.js  

## init
1) Go to ./scripts and run ``npm install``  
2) Then in the root folder run ``node scripts/init``

## structure
/services (this is where all the different microservices live)  
/deployment-strategies (different strategies demonstrated via kubernetes, the yaml files live in this folder)  
/patterns (docker-compose files for spinning up a specifik set on services in order to demonstrate a pattern)  
/user-interfaces (this is where the user interfaces lives)  
/scenarios (demo clients, UI-driven or API-consumer)  
/scripts (automation for this environment)  

## example
``node scenarios/demo-backend-for-front-end-pattern``

## demo system in this environment 
In order to test different patterns and deployment strategies we need a simple target system.  
An office space monitoring and assistans system (OSMAS) with a simple read-only dashboard. The UI will fetch information from different sources and display them on the screen. Clearly OSMAS also needs to be enhanced with additional specialized UI's (..so we can demonstrate the BFF pattern..).

The information can be:   
- location of the boss (this subdomain and bounded context, the boss, is owned by the-boss-service)    
- wheter or not it is the bosses birthday? (same the-boss-service as above..)  
- time to next stand up (subdomain and bounded context: meetings, lives in the-meetings-service)    
.... etc :)   
