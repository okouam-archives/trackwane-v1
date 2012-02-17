class Device < ActiveRecord::Base
  has_many :events
  belongs_to :account
  belongs_to :group

  def as_json(options)
    hash = super(options)
    hash[:group_name] = group.name if options[:computed] && options[:computed].include?("group_name")
    hash
  end

end
