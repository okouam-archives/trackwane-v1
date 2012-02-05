class CreateEventsTable < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :device
      t.integer :status_code
      t.decimal :latitude
      t.decimal :longitude
      t.decimal :speed
      t.string :address
      t.string :imei_number
      t.decimal :heading
      t.boolean :gps_signal
      t.datetime :date
      t.datetime :time
      t.timestamps
    end
  end
end
