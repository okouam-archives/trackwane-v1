class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :account
  validates_presence_of :language
end