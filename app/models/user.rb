class User < ActiveRecord::Base
  acts_as_authentic
  belongs_to :account, :counter_cache => true
end