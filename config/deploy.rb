require 'capistrano/ext/multistage'
require File.dirname(__FILE__) + '/boot'

set :application, "trackwane"
set :repository,  "git@github.com:okouam/trackwane.git"
set :scm, :git
set :branch, :master
set :stages, %w(staging production demo)
set :default_stage, "staging"
set :deploy_via, :remote_cache
set :ssh_options, { :forward_agent => true }

default_run_options[:pty] = true

namespace :deploy do
  task :start do end
  task :stop do end
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

namespace :configuration do
  task :symlinks, :roles => :app do
    run <<-CMD
      ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml
      ln -nfs #{shared_path}/config/initializers/geokit.rb #{release_path}/config/geokit.rb
      ln -nfs #{shared_path}/config/initializers/secret_token.rb #{release_path}/config/secret_token.rb
      ln -nfs #{shared_path}/config/initializers/omniauth.rb #{release_path}/config/initializers/omniauth.rb
      ln -nfs #{shared_path}/config/initializers/pusher.rb #{release_path}/config/initializers/pusher.rb
    CMD
  end
end

after "deploy:update_code", "configuration:symlinks"
after 'deploy:update_code', 'bundler:bundle_new_release'
after "deploy", "deploy:cleanup"

after 'bundler:bundle_new_release' do
  run "cd #{release_path}; RAILS_ENV=production rake assets:precompile"
  run "cd #{release_path}; RAILS_ENV=production rake geocms:assets"
end