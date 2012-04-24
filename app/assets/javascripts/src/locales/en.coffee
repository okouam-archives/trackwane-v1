$.translations ?= {};
$.translations["en"] =
  validation_alarm:
    name_required: 'Please provide an alarm name.'
    name_minlength: 'The alarm name must be a least {0} characters long'
    speed_required: 'Please provide a speed value'
    speed_digits: 'The speed value must be only digits' 
  validation_users:
    login_required: 'Please provide a login'
    login_minlength: 'The login must be a least {0} characters long'
    email_required: 'Please provide a email'
    email_bad_format: 'Please enter a valid email format'
    password_required: 'Please provide a password'
    password_minlength: 'The password must be a least {0} characters long'
  validation_devices:
    display_name_required: 'Please provide a name for the device'
    display_name_minlength: 'The name of a device must be a least {0} characters long'
    imei_number_required: 'Please provide a IMEI number for the device'
    imei_number_minlength: 'The IMEI number of a device must be at least {0} digits long'
    imei_number_digits: 'The IMEI number must be only digits'
  validation_places:
    name_required: 'Please provide a place name' 
    name_minlength: 'The place name must be a least {0} characters long'
    category_required: 'Please provide a category name'
    category_minlength: 'The category name must be a least {0} characters long.'
  validation_schedules:
    format_required: 'Please provide a format'
    format_minlength: 'The format must be a least {0} characters long'
    email_required: 'Please provide an email'
    email_format: 'Please enter a valid email format'
  confirmation_devices:
    delete: "Are you sure you want to delete this device?"
  confirmation_places:
    delete: "Are you sure you want to delete this place?"
  confirmation_accounts:
    delete: "Are you sure you want to delete this account?"
  confirmation_users:
    delete: "Are you sure you want to delete this users?"
