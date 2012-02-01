class CreatePlacesTable < ActiveRecord::Migration
  def change
      create_table :places do |t|
        t.string :name
        t.string :category
        t.decimal :longitude
        t.decimal :latitude
        t.references :account
        t.timestamps
      end
  end
end