class Alert < ActiveRecord::Base
  belongs_to :alertable, :polymorphic => true
  belongs_to :account

  def as_json(options = nil)
    hash = super(options)
		hash[:alarm_name] = alertable.name
    hash
  end

end