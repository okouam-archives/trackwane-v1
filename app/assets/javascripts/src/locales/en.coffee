$.translations ?= {}
$.translations["en"] =
  validation:
    accounts:
      name:
        required: "Please provide an account name"
        min_length: 'The account name must be a least {0} characters long'
    email:
      bad_format: "Please provide a valid email address"
      required: "Please provide an email address"
  validation_alarm:
    name_required: 'Please provide an alarm name'
    name_minlength: 'The alarm name must be a least {0} characters long'
    speed_required: 'Please provide a speed value'
    speed_digits: 'The speed value must be only digits' 
  validation_users:
    login_required: 'Please provide a login'
    login_minlength: 'The login must be a least {0} characters long'
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
