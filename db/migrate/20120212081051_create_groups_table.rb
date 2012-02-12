class CreateGroupsTable < ActiveRecord::Migration
  def change
      create_table :groups do |t|
        t.string :name
        t.integer :device_count
        t.references :account
        t.timestamps
      end
  end
end
