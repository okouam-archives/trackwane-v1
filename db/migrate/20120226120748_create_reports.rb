class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.references :account
      t.string :measure
      t.string :name
      t.string :devices
      t.string :daterange
      t.datetime :to
      t.datetime :from
    end
  end
end
