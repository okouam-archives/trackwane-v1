class CreateUsersTable < ActiveRecord::Migration
  def change
      create_table :users do |t|
        t.string :login, :null => false
        t.string :email, :null => false
        t.references :account
        t.string :crypted_password, :null => false
        t.string :password_salt, :null => false
        t.string :persistence_token, :null => false
        t.datetime :last_login_at
        t.string :last_login_ip
        t.string :role, :default => 'standard', :null => false
        t.string :status, :default => 'active', :null => false
        t.string :language, :default => 'en', :null => false
        t.timestamps
      end
  end
end