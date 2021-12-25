# Kyytto REST API



## End-points




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