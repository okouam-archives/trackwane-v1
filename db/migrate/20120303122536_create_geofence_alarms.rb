class CreateGeofenceAlarms < ActiveRecord::Migration
  def change
    create_table :geofence_alarms do |t|
      t.references :account
      t.string :name
      t.string :coordinates
      t.timestamps
    end
  end
end
