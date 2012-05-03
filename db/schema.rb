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
    t.string   "name"
    t.string   "email"
    t.string   "contact"
    t.string   "telephone"
    t.integer  "devices_count",   :default => 0
    t.integer  "places_count",    :default => 0
    t.integer  "users_count",     :default => 0
    t.integer  "geofences_count", :default => 0
    t.string   "standard_code"
    t.string   "manager_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "devices", :force => true do |t|
    t.integer  "account_id"
    t.string   "imei_number"
    t.string   "display_name"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", :force => true do |t|
    t.integer  "device_id"
    t.integer  "status_code"
    t.decimal  "speed"
    t.string   "address"
    t.decimal  "heading"
    t.boolean  "gps_signal"
    t.integer  "place_id"
    t.integer  "previous_event_id"
    t.datetime "date"
    t.decimal  "distance_delta"
    t.spatial  "lonlat",            :limit => {:srid=>4326, :type=>"point"}
    t.spatial  "point",             :limit => {:srid=>-1, :type=>"geometry"}
  end

  create_table "geofence_alarms", :force => true do |t|
    t.integer  "account_id"
    t.string   "name"
    t.string   "destination"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.spatial  "bounds",      :limit => {:srid=>4326, :type=>"polygon"}
  end

  create_table "geofence_warnings", :force => true do |t|
    t.integer  "event_id"
    t.integer  "alarm_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "geofences", :force => true do |t|
    t.string   "name"
    t.text     "coordinates"
    t.integer  "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "places", :force => true do |t|
    t.string   "name",                                                :null => false
    t.string   "category",                                            :null => false
    t.integer  "account_id",                                          :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.spatial  "lonlat",     :limit => {:srid=>4326, :type=>"point"}
  end

  create_table "reports", :force => true do |t|
    t.integer  "account_id"
    t.string   "category"
    t.string   "name"
    t.string   "devices"
    t.string   "period"
    t.datetime "date"
  end

  create_table "roads", :id => false, :force => true do |t|
    t.integer "id",                                                  :null => false
    t.string  "label"
    t.integer "country_id"
    t.spatial "the_geom",         :limit => {:no_constraints=>true}
    t.string  "route_parameters", :limit => 100
  end

  create_table "schedules", :force => true do |t|
    t.integer  "account_id"
    t.integer  "report_id"
    t.string   "email"
    t.string   "frequency"
    t.string   "format"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "speed_alarms", :force => true do |t|
    t.integer  "account_id"
    t.decimal  "speed"
    t.string   "name"
    t.string   "destination"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.spatial  "bounds",      :limit => {:srid=>4326, :type=>"polygon"}
  end

  create_table "speed_warnings", :force => true do |t|
    t.integer  "event_id"
    t.integer  "alarm_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "login",                                     :null => false
    t.string   "email",                                     :null => false
    t.integer  "account_id"
    t.string   "crypted_password",                          :null => false
    t.string   "password_salt",                             :null => false
    t.string   "persistence_token",                         :null => false
    t.datetime "last_login_at"
    t.string   "last_login_ip"
    t.string   "role",              :default => "standard", :null => false
    t.string   "status",            :default => "active",   :null => false
    t.string   "language",          :default => "en",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
