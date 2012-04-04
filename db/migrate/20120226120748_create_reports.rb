class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.references :account
      t.string :category
      t.string :name
      t.string :devices
      t.string :period
      t.datetime :date
    end
  end
end
