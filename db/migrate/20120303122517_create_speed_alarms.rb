class CreateSpeedAlarms < ActiveRecord::Migration
  def change
    create_table :speed_alarms do |t|
      t.references :account
      t.decimal :speed
      t.string :name
      t.timestamps
    end
  end
end
