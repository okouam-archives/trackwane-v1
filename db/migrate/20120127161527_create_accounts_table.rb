class CreateAccountsTable < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.string :contact
      t.string :telephone
      t.timestamps
    end
  end
end
