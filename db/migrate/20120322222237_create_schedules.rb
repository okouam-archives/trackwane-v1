class CreateSchedules < ActiveRecord::Migration
  create_table :schedules do |t|
    t.references :account
    t.references :report
    t.string :email
    t.string :frequency
    t.string :format
    t.timestamps
  end
end
