# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Trackwane::Application.initialize!

# Mine type for excel files
Mime::Type.register "application/vnd.ms-excel", :xls
