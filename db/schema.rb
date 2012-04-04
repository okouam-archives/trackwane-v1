# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120404103447) do

  create_table "accounts", :force => true do |t|
    t.column "name", :string
    t.column "email", :string
    t.column "contact", :string
    t.column "telephone", :string
    t.column "devices_count", :integer, :default => 0
    t.column "places_count", :integer, :default => 0
    t.column "users_count", :integer, :default => 0
    t.column "geofences_count", :integer, :default => 0
    t.column "standard_code", :string
    t.column "manager_code", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "alerts", :force => true do |t|
    t.column "account_id", :integer
    t.column "alertable_id", :integer
    t.column "alertable_type", :string
    t.column "destination", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

# Could not dump table "daily_distance_events" because of following StandardError
#   Unknown type 'name' for column 'device_name' in table 'daily_distance_events' ["/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/postgis_adapter-a1b5f0a55c43/lib/postgis_adapter/common_spatial_adapter.rb:52:in `block in table'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/postgis_adapter-a1b5f0a55c43/lib/postgis_adapter/common_spatial_adapter.rb:50:in `each'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/postgis_adapter-a1b5f0a55c43/lib/postgis_adapter/common_spatial_adapter.rb:50:in `table'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/schema_dumper.rb:79:in `block in tables'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/schema_dumper.rb:70:in `each'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/schema_dumper.rb:70:in `tables'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/schema_dumper.rb:27:in `dump'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/schema_dumper.rb:21:in `dump'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/railties/databases.rake:349:in `block (4 levels) in <top (required)>'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/railties/databases.rake:347:in `open'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/railties/databases.rake:347:in `block (3 levels) in <top (required)>'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:205:in `call'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:205:in `block in execute'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:200:in `each'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:200:in `execute'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:158:in `block in invoke_with_call_chain'", "/home/okouam/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/monitor.rb:201:in `mon_synchronize'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:151:in `invoke_with_call_chain'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:144:in `invoke'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bundler/gems/rails-0e6b118313b5/activerecord/lib/active_record/railties/databases.rake:162:in `block (2 levels) in <top (required)>'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:205:in `call'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:205:in `block in execute'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:200:in `each'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:200:in `execute'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:158:in `block in invoke_with_call_chain'", "/home/okouam/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/monitor.rb:201:in `mon_synchronize'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:151:in `invoke_with_call_chain'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/task.rb:144:in `invoke'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:116:in `invoke_task'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:94:in `block (2 levels) in top_level'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:94:in `each'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:94:in `block in top_level'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:133:in `standard_exception_handling'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:88:in `top_level'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:66:in `block in run'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:133:in `standard_exception_handling'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/lib/rake/application.rb:63:in `run'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290@global/gems/rake-0.9.2.2/bin/rake:33:in `<top (required)>'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bin/rake:19:in `load'", "/home/okouam/.rvm/gems/ruby-1.9.2-p290/bin/rake:19:in `<main>'"]

  create_table "daily_speed_events", :id => false, :force => true do |t|
    t.column "device_id", :integer
    t.column "device_name", :string
    t.column "period", :datetime
    t.column "data_point", :decimal
  end

  create_table "devices", :force => true do |t|
    t.column "account_id", :integer
    t.column "imei_number", :string
    t.column "display_name", :string
    t.column "group_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "events", :force => true do |t|
    t.column "device_id", :integer
    t.column "status_code", :integer
    t.column "latitude", :decimal
    t.column "longitude", :decimal
    t.column "speed", :decimal
    t.column "address", :string
    t.column "heading", :decimal
    t.column "gps_signal", :boolean
    t.column "place_id", :integer
    t.column "date", :datetime
    t.column "distance_delta", :decimal
  end

  create_table "geofence_alarms", :force => true do |t|
    t.column "account_id", :integer
    t.column "name", :string
    t.column "coordinates", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "geofence_warnings", :force => true do |t|
    t.column "event_id", :integer
    t.column "geofence_alarm_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "geofences", :force => true do |t|
    t.column "name", :string
    t.column "coordinates", :text
    t.column "account_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "monthly_distance_events", :id => false, :force => true do |t|
    t.column "device_id", :integer
    t.column "period", :datetime
    t.column "data_point", :decimal
  end

  create_table "monthly_speed_events", :id => false, :force => true do |t|
    t.column "device_id", :integer
    t.column "period", :datetime
    t.column "data_point", :decimal
  end

  create_table "places", :force => true do |t|
    t.column "name", :string, :null => false
    t.column "category", :string, :null => false
    t.column "longitude", :decimal, :null => false
    t.column "latitude", :decimal, :null => false
    t.column "account_id", :integer, :null => false
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "reports", :force => true do |t|
    t.column "account_id", :integer
    t.column "category", :string
    t.column "name", :string
    t.column "devices", :string
    t.column "period", :string
    t.column "date", :datetime
  end

  create_table "roads", :force => true do |t|
    t.column "label", :string
    t.column "country_id", :integer
    t.column "the_geom", :geometry, :srid => nil
    t.column "route_parameters", :string, :limit => 100
  end

  create_table "schedules", :force => true do |t|
    t.column "account_id", :integer
    t.column "report_id", :integer
    t.column "email", :string
    t.column "frequency", :string
    t.column "format", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "sessions", :force => true do |t|
    t.column "session_id", :string, :null => false
    t.column "data", :text
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "speed_alarms", :force => true do |t|
    t.column "account_id", :integer
    t.column "speed", :decimal
    t.column "name", :string
    t.column "coordinates", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "speed_warnings", :force => true do |t|
    t.column "event_id", :integer
    t.column "speed_alarm_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "users", :force => true do |t|
    t.column "login", :string, :null => false
    t.column "email", :string, :null => false
    t.column "account_id", :integer
    t.column "crypted_password", :string, :null => false
    t.column "password_salt", :string, :null => false
    t.column "persistence_token", :string, :null => false
    t.column "last_login_at", :datetime
    t.column "last_login_ip", :string
    t.column "role", :string, :default => "administrator", :null => false
    t.column "status", :string, :default => "active", :null => false
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "weekly_distance_events", :id => false, :force => true do |t|
    t.column "device_id", :integer
    t.column "period", :datetime
    t.column "data_point", :decimal
  end

  create_table "weekly_speed_events", :id => false, :force => true do |t|
    t.column "device_id", :integer
    t.column "period", :datetime
    t.column "data_point", :decimal
  end

end
