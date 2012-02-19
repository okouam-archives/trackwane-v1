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

ActiveRecord::Schema.define(:version => 20120218063221) do

  create_table "accounts", :force => true do |t|
    t.column "name", :string
    t.column "email", :string
    t.column "contact", :string
    t.column "telephone", :string
    t.column "devices_count", :integer
    t.column "alarms_count", :integer
    t.column "places_count", :integer
    t.column "users_count", :integer
    t.column "geofences_count", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "alarms", :force => true do |t|
    t.column "name", :string
    t.column "category", :string
    t.column "account_id", :integer
    t.column "rule", :string
    t.column "recipient", :string
    t.column "medium", :string
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
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
    t.column "imei_number", :string
    t.column "heading", :decimal
    t.column "gps_signal", :boolean
    t.column "alarm_id", :integer
    t.column "date", :datetime
  end

  create_table "geofences", :force => true do |t|
    t.column "name", :string
    t.column "coordinates", :text
    t.column "account_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "groups", :force => true do |t|
    t.column "name", :string
    t.column "device_count", :integer
    t.column "account_id", :integer
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

  create_table "places", :force => true do |t|
    t.column "name", :string
    t.column "category", :string
    t.column "longitude", :decimal
    t.column "latitude", :decimal
    t.column "account_id", :integer
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

  create_table "tracks", :force => true do |t|
    t.column "device_id", :integer
    t.column "status_code", :integer
    t.column "latitude", :decimal
    t.column "longitude", :decimal
    t.column "speed", :decimal
    t.column "address", :string
    t.column "imei_number", :string
    t.column "heading", :decimal
    t.column "alarm_id", :integer
    t.column "date", :datetime
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

end
