class CreateAlarmsTable < ActiveRecord::Migration
  def change
      create_table :alarms do |t|
        t.string :name
        t.integer :category
        t.references :account
        t.string :rule
        t.string :recipient
        t.string :action
        t.timestamps
      end
  end
end
