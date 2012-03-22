class Alert < ActiveRecord::Base
  belongs_to :alertable, :polymorphic => true
end