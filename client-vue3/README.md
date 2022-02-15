# client-vue3

## CI/CD pipeline

- Source code hosted in GitHub
- Build is done in TeamCity
  - npm install and build done on a TeamCity agent
  - npm build is done with placeholder arguments from .env.production
  - docker build stores actual values of arguments in environment settings
  - container is pushed to DockerHub
  - on start, the container runs init.sh which updates the placeholder arguments with proper value.
    One of the values is the host address of the k-server api server. Init.sh performs hostname to ip resolution and 
    replaces the hostname with the actual ip of the api server. This requires that the k-client-vue3 container and 
    k-server container are in the same docker network.
- Application is deployed with a docker-compose file 