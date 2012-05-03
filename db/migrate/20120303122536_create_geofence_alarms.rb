class CreateGeofenceAlarms < ActiveRecord::Migration
  def change
    create_table :geofence_alarms do |t|
      t.references :account
      t.string :name
      t.string :destination
      t.polygon :bounds, :srid => 4326, :null => false
      t.timestamps
    end
  end
end
