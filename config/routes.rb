Gowane::Application.routes.draw do

  match 'map/realtime' => 'map#realtime'
  match 'map/historical' => 'map#historical'
  match 'map/pois' => 'map#pois'
  match 'map/geofences' => 'map#geofences'

  resources :reports do
    collection do
      get :stop
      get :gps
      get :distance
    end
  end

  resources :accounts, :drivers, :user_sessions, :users, :places, :geofences, :alarms, :groups

  resources :devices do
    collection do
      get :poll
    end
    member do
      get :events
    end
  end

  root :to => 'map#pois'

end
