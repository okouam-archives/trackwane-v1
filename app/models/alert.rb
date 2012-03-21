class Alert < ActiveRecord::Base
  belongs_to :alertable
end

class MobileAlert < Alert

end

class EmailAlert < Alert

end
