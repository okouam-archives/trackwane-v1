class CreateGeofences < ActiveRecord::Migration
  def change
      create_table :geofences do |t|
        t.string :name
        t.string :coordinates
        t.references :account
        t.timestamps
      end
  end
end