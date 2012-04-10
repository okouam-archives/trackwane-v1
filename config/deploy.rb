require 'capistrano/ext/multistage'
require File.dirname(__FILE__) + '/boot'

set :application, "trackwane"
set :repository,  "git@github.com:0-One/trackwane.git"
set :scm, :git
set :branch, :master
set :stages, ["staging", "production"]

set :default_stage, "staging"
set :deploy_via, :remote_cache
set :user, "deployment"
set :ssh_options, { :forward_agent => true }
set :rake, "/var/lib/gems/1.8/bin/rake"
role :web, "www.trackwane.com"
role :app, "www.trackwane.com"
role :db,  "www.trackwane.com", :primary => true

default_run_options[:pty] = true

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :bundler do
  task :create_symlink, :roles => :app do
    shared_dir = File.join(shared_path, 'bundle')
    release_dir = File.join(current_release, '.bundle')
    run("mkdir -p #{shared_dir} && ln -s #{shared_dir} #{release_dir}")
  end
 
  task :bundle_new_release, :roles => :app do
    bundler.create_symlink
    run "cd #{release_path} && bundle install --without test"
  end
end

after 'deploy:update_code', 'bundler:bundle_new_release'

after 'bundler:bundle_new_release' do
  run "cd #{release_path}; RAILS_ENV=production rake assets:precompile"
  run "cd #{release_path}; RAILS_ENV=production rake trackwane:assets"
end