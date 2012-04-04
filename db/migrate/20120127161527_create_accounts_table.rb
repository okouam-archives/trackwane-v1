class CreateAccountsTable < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.string :contact
      t.string :telephone
      t.integer :devices_count, :default => 0
      t.integer :places_count, :default => 0
      t.integer :users_count, :default => 0
      t.integer :geofences_count, :default => 0
      t.string :standard_code
      t.string :manager_code
      t.timestamps
    end
  end
end
