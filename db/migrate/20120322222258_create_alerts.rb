class CreateAlerts < ActiveRecord::Migration
  create_table :alerts do |t|
    t.references :account
    t.integer :alertable_id
    t.string :alertable_type
    t.string :destination
    t.timestamps
  end
end
