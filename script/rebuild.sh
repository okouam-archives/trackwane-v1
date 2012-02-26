#!/bin/bash

sudo service postgresql restart; bundle exec rake db:drop; bundle exec rake db:create; bundle exec rake db:migrate; bundle exec rake db:seed --trace; sudo service apache2 restart
