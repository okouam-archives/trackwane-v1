Rails.application.config.middleware.use OmniAuth::Builder do
    provider :twitter, 'CONSUMER_KEY', 'CONSUMER_SECRET'
    provider :facebook, '263594897070701', '109bedfaaed42d5d32efdcd9b8a7276b'
    # Mention other providers here you want to allow user to sign in with
end
