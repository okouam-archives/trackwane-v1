Place.delete_all
Device.delete_all
User.delete_all
Account.delete_all

Account.create([
  {name: "0-One", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name},
  {name: "Demo Account", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name},
  {name: "Auto Traders", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name},
  {name: "Alphaville", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name}
])

User.create([
  {login: "okouam", password: "com99123", password_confirmation: "com99123", email: "olivier.kouame@gmail.com",
   role: "administrator", account: Account.find_by_name("0-One")},
  {login: "guest", password: "guest", password_confirmation: "guest", email: "olivier.kouame@gmail.com",
   role: "administrator", account: Account.find_by_name("0-One")},
  {login: "guest", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Demo Account")},
  {login: "patrick.kouame", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Auto Traders")},
  {login: "sammy", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Alphaville")},
  {login: "ralph", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Alphaville")},
  {login: "tony", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "monitor", account: Account.find_by_name("Alphaville")},
  {login: "patrick.tognisso", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Demo Account")},
  {login: "sam", password: "password", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Auto Traders")},
])

Group.create([
  {name: "Alpha Team", account: Account.find_by_name("Auto Traders")},
  {name: "Kappa Team", account: Account.find_by_name("Auto Traders")},
  {name: "Gamma Team", account: Account.find_by_name("Auto Traders")},
  {name: "Management", account: Account.find_by_name("Alphaville")},
  {name: "Technical Support", account: Account.find_by_name("Demo Account")},
  {name: "Sales", account: Account.find_by_name("Demo Account")}
])

Device.create([
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account: Account.find_by_name("Auto Traders"), :group => Group.find_by_name("Alpha Team")},
  {imei_number: 1234567, display_name: "Ford Escort 695LD9232", account: Account.find_by_name("Demo Account"), :group => Group.find_by_name("Alpha Team")},
  {imei_number: 345435006, display_name: "Rolls Royce 123JD9484", account: Account.find_by_name("Alphaville"), :group => Group.find_by_name("Alpha Team")},
  {imei_number: 543677807, display_name: "Peugeot 512 5343FL93", account: Account.find_by_name("Alphaville"), :group => Group.find_by_name("Management")},
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account: Account.find_by_name("Alphaville"), :group => Group.find_by_name("Management")},
  {imei_number: 248234234, display_name: "Caterpillar 846FH3834", account: Account.find_by_name("Auto Traders"), :group => Group.find_by_name("Kappa Team")},
  {imei_number: 657575675, display_name: "Nissan Focus 02937LK383", account: Account.find_by_name("Auto Traders"), :group => Group.find_by_name("Kappa Team")},
  {imei_number: 248234234, display_name: "BMW Mini 3849DJD394", account: Account.find_by_name("Demo Account"), :group => Group.find_by_name("Technical Support")},
  {imei_number: 270110, display_name: "Fiat 34LFJ334", account: Account.find_by_name("Demo Account"), :group => Group.find_by_name("Technical Support")},
  {imei_number: 248234234, display_name: "Corvette 1102LP394", account: Account.find_by_name("Demo Account"), :group => Group.find_by_name("Sales")},
  {imei_number: 343580788, display_name: "Subaru 232", account: Account.find_by_name("Demo Account"), :group => Group.find_by_name("Sales")},
  {imei_number: 322509765, display_name: "Volkswagen 21KF334", account: Account.find_by_name("Auto Traders"), :group => Group.find_by_name("Gamma Team")}
])

Place.create([
  {name: "225 Discothek", category: "Bar", account_id: Account.find_by_name("Auto Traders"),
    longitude: -4, latitude: 5.375726347198491},
  {name: "ABC", category: "Cafe ou maquis", account_id: Account.find_by_name("Auto Traders"),
    longitude: -5.36437, latitude: 5.85136},
  {name: "Afifco SA", category: "Cybercafe", account_id: Account.find_by_name("Demo Account"),
    longitude: -4.0118781378174, latitude: 5.3383041670227},
  {name: "Affo", category: "Entreprises", account_id: Account.find_by_name("Demo Account"),
    longitude: 1.21523, latitude: 6.13391},
  {name: "ABA Champion", category: "Publicite", account_id: Account.find_by_name("Demo Account"),
    longitude: -4.06395, latitude: 5.34676},
  {name: "Afe Lero", category: "Bar", account_id: Account.find_by_name("Demo Account"),
    longitude: -3.9783827116394, latitude: 5.2910972883606},
  {name: "AATR Geroute", category: "Auberge ou foyer", account_id: Account.find_by_name("Demo Account"),
    longitude: -5.0409673, latitude: 7.6807384},
  {name: "ABC", category: "Bar", account_id: Account.find_by_name("Alphaville"),
    longitude: 2.353647, latitude: 6.3891554},
  {name: "Abatam", category: "Bar", account_id: Account.find_by_name("Alphaville"),
    longitude: 1.25152, latitude: 6.14528},
  {name: "2D Oressing", category: "Pressing", account_id: Account.find_by_name("Alphaville"),
    longitude: 1.27997, latitude: 6.15408},
  {name: "3d Traitement de Bois", category: "Bar", account_id: Account.find_by_name("Alphaville"),
    longitude: -4.24234, latitude: 5.234},
  {name: "2M Concepte", category: "Bar", account_id: Account.find_by_name("Auto Traders"),
    longitude: -3.23423, latitude: 5.234234}
])