$.translations ?= {}
$.translations["fr"] =
  validation:
    accounts:
      name:
        required: "Veuillez entrer le nom du client"
        min_length: 'Le nom du client doit comprendre au moins {0} caractères'
    email:
      bad_format: "Veuillez entrer une addresse email valide"
      required: "Veuillez entrer une addresse email"
  validation_alarm:
    name_required: 'Veuillez donner un nom à cette alarme.'
    name_minlength: 'Le nom de cette alarme doit comprendre au moins {0} caractères.'
    speed_required: 'Veuillez donner une valeur pour la vitesse'
    speed_digits: 'La valeur de la vitesse doit contenir uniquement des chiffres' 
  validation_users:
    login_required: 'Veuillez entrer un login'
    login_minlength: 'Le login doit comprendre au moins {0} caractères'
    password_required: 'Veuillez entrer un mot de passe'
    password_minlength: 'Le mot de passe doit comprendre au moins {0} caractères.'
  validation_devices: 
    display_name_required: 'Veuillez donner un nom à cet véhicule.'
    display_name_minlength: 'Le nom du véhicule doit comprendre au moins {0} caractères'
    imei_number_required: 'Veuillez donner un numéro IMEI au véhicule'
    imei_number_minlength: 'Le numéro IMEI doit comprendre au moins {0} caractères'
    imei_number_digits: 'Le numéro IMEI doit contenir uniquement des chiffres'
  validation_places:
    name_required: "Veuillez entrez le nom du lieu"
    name_minlength: 'Le nom du lieu doit comprendre au moins {0} caractères.'
    category_required: "Please provide a category name"
    category_minlength: 'Le nom de la catégorie doit comprendre au moins {0} caractères.'
  validation_schedules:
    format_required: 'Veuillez donner un format'
    format_minlength: 'Le format doit comprendre au moins {0} caractères.'
       
    
      
    
