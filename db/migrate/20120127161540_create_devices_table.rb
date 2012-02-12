class CreateDevicesTable < ActiveRecord::Migration
  def change
      create_table :devices do |t|
        t.references :account
        t.string :imei_number
        t.string :display_name
        t.references :group
        t.timestamps
      end
  end
end
