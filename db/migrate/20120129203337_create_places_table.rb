class CreatePlacesTable < ActiveRecord::Migration
  def change
      create_table :places do |t|
        t.string :name
        t.string :category
        t.references :account
        t.timestamps
      end
  end
end