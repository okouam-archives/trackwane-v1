class CreateTracksTable < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.references :device
      t.integer :status_code
      t.decimal :latitude
      t.decimal :longitude
      t.decimal :speed
      t.string :address
      t.string :imei_number
      t.decimal :heading
      t.references :alarm
      t.datetime :date
    end
  end
end
