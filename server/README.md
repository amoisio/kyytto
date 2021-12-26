# Kyytto REST API



## End-points


## Unit of work middleware

 Creates and attaches a UnitOfWork type to the request so that it can be used by any downstream request handler. Before
 doing so a startSession method is called and a closeSession method call is hooked onto the request 'finish' event. These
 methods serve as 'init' and 'cleanup' hooks for various UnitOfWork implementations.

 




## Folder structure

| Folder | Description|
|---|---|
| src | server source code|
| tests | end-to-end and integration tests|

**Where to put tests?**

| Test type | Location |
|---|---|
| unit | close to code being tested|
| component | close to code being tested|
| integration | under *tests*|
| e2e | under *tests*|


OptionsMiddleware
-> Reads general options (includes storage type option)
-> Storage type option fed into optionsBuilder which returns the right type of storage options


Kyytto Storage plugin... how would it work?
- All storage related stuff would be there
- Includes a middleware component which wires up necessary types 
  - UnitOfWork
  !! Does not need to expose storage specific options. Only need to document which environment variables are used.

Options 
-
-> Storage Type