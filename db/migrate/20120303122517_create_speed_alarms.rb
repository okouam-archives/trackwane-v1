class CreateSpeedAlarms < ActiveRecord::Migration
  def change
    create_table :speed_alarms do |t|
      t.references :account
      t.decimal :speed
      t.string :name
      t.string :coordinates
      t.boolean :is_active
      t.timestamps
    end
  end
end
