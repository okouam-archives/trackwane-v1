class CreateAccountsTable < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.string :contact
      t.string :telephone
      t.integer :devices_count
      t.integer :alarms_count
      t.integer :places_count
      t.integer :users_count
      t.integer :geofences_count
      t.timestamps
    end
  end
end
