Place.delete_all
Device.delete_all
User.delete_all
Account.delete_all

Account.create([
  {name: "Fleet Service", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name},
  {name: "Auto Traders", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name},
  {name: "Alphaville", telephone: Faker::PhoneNumber.phone_number, email: Faker::Internet.email, contact: Faker::Name.name}
])

User.create([
  {login: "okouam", password: "com99123", password_confirmation: "com99123", email: "olivier.kouame@gmail.com",
   role: "administrator", account: Account.find_by_name("Fleet Service")},
  {login: "johnny", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "monitor", account: Account.find_by_name("Auto Traders")},
  {login: "sammy", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Alphaville")},
  {login: "ralph", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Alphaville")},
  {login: "tony", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "monitor", account: Account.find_by_name("Alphaville")},
  {login: "pete", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Fleet Service")},
  {login: "sam", password: "com99123", password_confirmation: "com99123", email: Faker::Internet.email,
   role: "administrator", account: Account.find_by_name("Auto Traders")},
])

Device.create([
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account: Account.find_by_name("Auto Traders")},
  {imei_number: 1234567, display_name: "Ford Escort 695LD9232", account: Account.find_by_name("Auto Traders")},
  {imei_number: 345435006, display_name: "Rolls Royce 123JD9484", account: Account.find_by_name("Alphaville")},
  {imei_number: 543677807, display_name: "Peugeot 512 5343FL93", account: Account.find_by_name("Alphaville")},
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account: Account.find_by_name("Alphaville")},
  {imei_number: 248234234, display_name: "Caterpillar 846FH3834", account: Account.find_by_name("Auto Traders")},
  {imei_number: 657575675, display_name: "Nissan Focus 02937LK383", account: Account.find_by_name("Auto Traders")},
  {imei_number: 248234234, display_name: "BMW Mini 3849DJD394", account: Account.find_by_name("Fleet Service")},
  {imei_number: 270110, display_name: "Fiat 34LFJ334", account: Account.find_by_name("Fleet Service")},
  {imei_number: 248234234, display_name: "Corvette 1102LP394", account: Account.find_by_name("Fleet Service")},
  {imei_number: 343580788, display_name: "Subaru 232", account: Account.find_by_name("Fleet Service")},
  {imei_number: 322509765, display_name: "Volkswagen 21KF334", account: Account.find_by_name("Auto Traders")}
])

Place.create([
  {name: "225 Discothek", category: "Bar", account_id: Account.find_by_name("Auto Traders"),
    longitude: -4, latitude: 5.375726347198491},
  {name: "ABC", category: "Cafe ou maquis", account_id: Account.find_by_name("Auto Traders"),
    longitude: -5.36437, latitude: 5.85136},
  {name: "Afifco SA", category: "Cybercafe", account_id: Account.find_by_name("Fleet Service"),
    longitude: -4.0118781378174, latitude: 5.3383041670227},
  {name: "Affo", category: "Entreprises", account_id: Account.find_by_name("Fleet Service"),
    longitude: 1.21523, latitude: 6.13391},
  {name: "ABA Champion", category: "Publicite", account_id: Account.find_by_name("Fleet Service"),
    longitude: -4.06395, latitude: 5.34676},
  {name: "Afe Lero", category: "Bar", account_id: Account.find_by_name("Fleet Service"),
    longitude: -3.9783827116394, latitude: 5.2910972883606},
  {name: "AATR Geroute", category: "Auberge ou foyer", account_id: Account.find_by_name("Fleet Service"),
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