#!/bin/bash

sudo service postgresql restart
bundle exec rake db:drop RAILS_ENV=$1
bundle exec rake db:create RAILS_ENV=$1
bundle exec rake db:migrate RAILS_ENV=$1
bundle exec rake db:seed RAILS_ENV=$1
sudo service apache2 restart
