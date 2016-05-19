#!/bin/bash

#built-in env variables for connection to remote host with ssh, you have to set value in .travis.yml, or travis-ci.org
#DEPLOY_HOST, DEPLOY_USER, DEPLOY_PASSWORD, TARGET_DEPLOY_FILE[optional, default [DEPLOY_USER's home/__deploy.sh]]

#you can define environment variable to use in this script file,
#and it will be replaced with value defined in .travis.yml when deploying, such as
# cd ${git_repository_on_deploy_host} # git_repository_on_deploy_host should be defined in .travis.yml
# git pull

echo start
#whatever you want to do on deployment target host
echo you are right
echo end
