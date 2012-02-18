class CreateAlarmsTable < ActiveRecord::Migration
  def change
      create_table :alarms do |t|
        t.string :name
        t.string :category
        t.references :account
        t.string :rule
        t.string :recipient
        t.string :medium
        t.timestamps
      end
  end
end
