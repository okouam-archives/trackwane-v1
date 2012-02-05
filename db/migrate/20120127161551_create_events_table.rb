class CreateEventsTable < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :device
      t.integer :status_code
      t.decimal :latitude
      t.decimal :longitude
      t.decimal :speed
      t.string :address
      t.timestamps
    end
  end
end
