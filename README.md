Trackwane
=========
Trackwane is a GPS tracking platform currently in use at 0-One. It provides a
basic set of functionality such as creating geofences, visualizing the realtime movement
of GPS trackers and running reports on the trackers. A live demo is available at http://demo.trackwane.com.

Getting Started
---------------
1.  Clone the repository
2.  Create your database. Trackwane runs on PostgreSQL with PostGIS. We currently develop on PostgreSQL 9.1 with
    PostGIS 2.0 though anything down to PostgreSQL 8.4 and PostGIS 1.5 should be sufficient.
3.  Run the migrations and create an administrator.
4.  Configure the application. This includes setting up Pusher (with a free account), the secret token for your application,
    the OmniAuth credentials and setting up GeoKit.
5.  Log into the site as administrator and start adding GPS trackers.
6.  Configure your GPS trackers to connect to /events.
7.  Start exploring the tracking possibilities offered!

Contributing
------------
We hope that you will consider contributing to Trackwane. We're open to any new features/improvements you can think of and
of course fixing any open bugs is always a high priority for our team.

Documentation
-------------
Take a look at the Trackwane Wiki for more information about its design and the architectural decisions that guided
our development.

Maintainers
-----------
* Olivier Kouamé (https://github.com/okouam)
* Moussa Diamera (https://github.com/docteurdiam)

License
-------
MIT License. Copyright 2012 Olivier Kouamé (Codeifier). http://www.codeifier.com



