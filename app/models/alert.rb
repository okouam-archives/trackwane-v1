class Alert < ActiveRecord::Base
  belongs_to :alertable, :polymorphic => true

  def as_json(options = nil)
    hash = super(options)
		hash[:name] = alertable.name
    hash
  end

end