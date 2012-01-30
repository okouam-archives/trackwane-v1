Place.delete_all
Device.delete_all
User.delete_all
Account.delete_all

Account.create([
  {name: "Fleet Service"}, {name: "Auto Traders"}, {name: "Alphaville"}
])

User.create([
  {login: "okouam", password: "com99123", password_confirmation: "com99123", email: "olivier.kouame@gmail.com",
   role: "administrator", account_id: Account.find_by_name("Fleet Service")},
  {login: "johnny", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "monitor", account_id: Account.find_by_name("Auto Traders")},
  {login: "sammy", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account_id: Account.find_by_name("Alphaville")},
  {login: "ralph", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account_id: Account.find_by_name("Alphaville")},
  {login: "tony", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "monitor", account_id: Account.find_by_name("Alphaville")},
  {login: "pete", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account_id: Account.find_by_name("Fleet Service")},
  {login: "sam", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account_id: Account.find_by_name("Auto Traders")},
])

Device.create([
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account_id: Account.find_by_name("Auto Traders")},
  {imei_number: 340055353, display_name: "Ford Escort 695LD9232", account_id: Account.find_by_name("Auto Traders")},
  {imei_number: 345435006, display_name: "Rolls Royce 123JD9484", account_id: Account.find_by_name("Alphaville")},
  {imei_number: 543677807, display_name: "Peugeot 512 5343FL93", account_id: Account.find_by_name("Alphaville")},
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account_id: Account.find_by_name("Alphaville")},
  {imei_number: 248234234, display_name: "Caterpillar 846FH3834", account_id: Account.find_by_name("Auto Traders")},
  {imei_number: 657575675, display_name: "Nissan Focus 02937LK383", account_id: Account.find_by_name("Auto Traders")},
  {imei_number: 248234234, display_name: "BMW Mini 3849DJD394", account_id: Account.find_by_name("Fleet Service")},
  {imei_number: 248234234, display_name: "Fiat 34LFJ334", account_id: Account.find_by_name("Fleet Service")},
  {imei_number: 248234234, display_name: "Corvette 1102LP394", account_id: Account.find_by_name("Fleet Service")},
  {imei_number: 343580788, display_name: "Subaru 232", account_id: Account.find_by_name("Fleet Service")},
  {imei_number: 322509765, display_name: "Volkswagen 21KF334", account_id: Account.find_by_name("Auto Traders")}
])

Place.create([
  {name: "225 Discothek", category: "Bar", account_id: Account.find_by_name("Auto Traders")},
  {name: "ABC", category: "Cafe ou maquis", account_id: Account.find_by_name("Auto Traders")},
  {name: "Afifco SA", category: "Cybercafe", account_id: Account.find_by_name("Fleet Service")},
  {name: "Affo", category: "Entreprises", account_id: Account.find_by_name("Fleet Service")},
  {name: "ABA Champion", category: "Publicite", account_id: Account.find_by_name("Fleet Service")},
  {name: "Afe Lero", category: "Bar", account_id: Account.find_by_name("Fleet Service")},
  {name: "AATR Geroute", category: "Auberge ou foyer", account_id: Account.find_by_name("Fleet Service")},
  {name: "ABC", category: "Bar", account_id: Account.find_by_name("Alphaville")},
  {name: "Abatam", category: "Bar", account_id: Account.find_by_name("Alphaville")},
  {name: "2D Oressing", category: "Pressing", account_id: Account.find_by_name("Alphaville")},
  {name: "3d Traitement de Bois", category: "Bar", account_id: Account.find_by_name("Alphaville")},
  {name: "2M Concepte", category: "Bar", account_id: Account.find_by_name("Auto Traders")}
])