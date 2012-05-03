class CreateGeofenceWarnings < ActiveRecord::Migration
  create_table :geofence_warnings do |t|
    t.references :event
    t.references :alarm
    t.timestamps
  end
end
