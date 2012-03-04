Place.delete_all
Device.delete_all
User.delete_all
SpeedAlarm.delete_all
GeofenceAlarm.delete_all
Group.delete_all
Geofence.delete_all
Account.delete_all

# Accounts

o1_account =  Factory(:account, :name => "0-One")
demo_account =  Factory(:account, :name => "Demo")
radio_account =  Factory(:account, :name => "Radio Ivoire")
orange_account =  Factory(:account, :name => "Orange CI")

# Users

Factory(:user, login: "okouam", password: "com99123", email: "olivier.kouame@gmail.com", account: o1_account)
Factory(:user, login: "guest", password: "guest", account: demo_account)
Factory(:user, login: "patrick.kouame", password: "changeme", email: "patrick.kouame@0-one.net", account: o1_account)
Factory(:user, login: "sammy", account: radio_account)
Factory(:user, login: "ralph", account: radio_account, role: "employee")
Factory(:user, login: "tony", account: orange_account)
Factory(:user, login: "patrick.tognisso", password: "changeme", email: "patrick.tognisso@0-one.net", account: o1_account)
Factory(:user, login: "sam", account: demo_account, role: "employee")

# Groups

Group.create([
  {name: "Alpha Team", account: o1_account},
  {name: "Kappa Team", account: radio_account},
  {name: "Gamma Team", account: radio_account},
  {name: "Management", account: orange_account},
  {name: "Technical Support", account: demo_account},
  {name: "Sales", account: demo_account}
])

# Devices

Device.create([
  {imei_number: 55676543, display_name: "Test Car 99XX99", account: o1_account, :group => Group.find_by_name("Alpha Team")},
  {imei_number: 1234567, display_name: "Ford Escort 695LD9232", account: o1_account, :group => Group.find_by_name("Alpha Team")},
  {imei_number: 345435006, display_name: "Rolls Royce 123JD9484", account: radio_account, :group => Group.find_by_name("Kappa Team")},
  {imei_number: 543677807, display_name: "Peugeot 512 5343FL93", account: radio_account, :group => Group.find_by_name("Kappa Team")},
  {imei_number: 248234234, display_name: "Mitsubishi 5343FL93", account: radio_account, :group => Group.find_by_name("Gamma Team")},
  {imei_number: 248234234, display_name: "Caterpillar 846FH3834", account: orange_account, :group => Group.find_by_name("Management")},
  {imei_number: 657575675, display_name: "Nissan Focus 02937LK383", account: orange_account, :group => Group.find_by_name("Management")},
  {imei_number: 248234234, display_name: "BMW Mini 3849DJD394", account: demo_account, :group => Group.find_by_name("Technical Support")},
  {imei_number: 270110, display_name: "Fiat 34LFJ334", account: demo_account, :group => Group.find_by_name("Technical Support")},
  {imei_number: 248234234, display_name: "Corvette 1102LP394", account: demo_account, :group => Group.find_by_name("Sales")},
  {imei_number: 343580788, display_name: "Subaru 232", account: demo_account, :group => Group.find_by_name("Sales")},
  {imei_number: 322509765, display_name: "Volkswagen 21KF334", account: orange_account, :group => Group.find_by_name("Management")}
])

# Places

Place.create([
	{name: "Test Place A", category: "Pressing", account: o1_account, longitude: -4.01296, latitude: 5.321768},
	{name: "Test Place B", category: "Bar", account: o1_account, longitude: -4.008411, latitude: 5.310508},
	{name: "Test Place C", category: "Hotel", account: o1_account, longitude: -4.00369, latitude: 5.333113},
	{name: "Test Place D", category: "Entreprises", account: o1_account, longitude: -3.997618, latitude: 5.32696},
  {name: "225 Discothek", category: "Bar", account: orange_account, longitude: -4, latitude: 5.375726347198491},
  {name: "ABC", category: "Cafe ou maquis", account: orange_account, longitude: -5.36437, latitude: 5.85136},
  {name: "Afifco SA", category: "Cybercafe", account: demo_account, longitude: -4.0118781378174, latitude: 5.3383041670227},
  {name: "Affo", category: "Entreprises", account: demo_account,longitude: 1.21523, latitude: 6.13391},
  {name: "ABA Champion", category: "Publicite", account: demo_account, longitude: -4.06395, latitude: 5.34676},
  {name: "Afe Lero", category: "Bar", account: orange_account, longitude: -3.9783827116394, latitude: 5.2910972883606},
  {name: "AATR Geroute", category: "Auberge ou foyer", account: demo_account, longitude: -5.0409673, latitude: 7.6807384},
  {name: "ABC", category: "Bar", account: radio_account, longitude: 2.353647, latitude: 6.3891554},
  {name: "Abatam", category: "Bar", account: radio_account, longitude: 1.25152, latitude: 6.14528},
  {name: "2D Oressing", category: "Pressing", account: o1_account, longitude: 1.27997, latitude: 6.15408},
	{name: "3d Traitement de Bois", category: "Bar", account: o1_account, longitude: -4.24234, latitude: 5.234},
  {name: "2M Concepte", category: "Bar", account: o1_account, longitude: -3.23423, latitude: 5.234234}
])

# Geofences

inclusion_zone = Geofence.create({name: "Inclusion Zone", category: "inclusion", account: o1_account,
	 coordinates: "POLYGON((5.348177 -4.024, 5.316387 -4.021769, 5.316387 -3.98778, 5.353647 -3.986063, 5.348177 -4.024))"})

exclusion_zone = Geofence.create({name: "Exclusion Zone", category: "exclusion", account: o1_account,
	 coordinates: "POLYGON((5.338213 -4.003165, 5.329368 -4.011362, 5.327616 -3.990934, 5.339324 -3.992779, 5.338213 -4.003165))"})

# Geofence Alarms

GeofenceAlarm.create([
	{name: "Inclusion Zone Alarm", geofence: inclusion_zone, account: o1_account, category: "inclusion"},
	{name: "Exclusion Zone Alarm", geofence: exclusion_zone, account: o1_account, category: "exclusion"}
])

# Speed Speed Alarms

SpeedAlarm.create([
	{name: "Over 90 Alarm", account: o1_account, speed: 90},
	{name: "Over 75 Alarm", account: o1_account, speed: 75}
])