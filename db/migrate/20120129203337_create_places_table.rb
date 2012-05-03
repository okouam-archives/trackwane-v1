class CreatePlacesTable < ActiveRecord::Migration
  def change
      create_table :places do |t|
        t.string :name, :null => false
        t.string :category, :null => false
        t.point :lonlat, :srid => 4326, :null => false
        t.references :account, :null => false
        t.timestamps
      end
  end
end