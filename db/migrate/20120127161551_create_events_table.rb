class CreateEventsTable < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :device
      t.integer :status_code
      t.decimal :latitude
      t.decimal :longitude
      t.decimal :speed
      t.string :address
      t.decimal :heading
      t.boolean :gps_signal
      t.references :place
      t.integer :previous_event_id
      t.datetime :date
      t.geometry :point
      t.decimal :distance_delta
    end
  end
end
