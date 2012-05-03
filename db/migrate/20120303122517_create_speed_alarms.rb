class CreateSpeedAlarms < ActiveRecord::Migration
  def change
    create_table :speed_alarms do |t|
      t.references :account
      t.decimal :speed
      t.string :name
      t.string :destination
      t.polygon :bounds, :srid => 4326, :null => false
      t.timestamps
    end
  end
end
