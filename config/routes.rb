Gowane::Application.routes.draw do

  match 'help/:section' => 'help#index'
  match 'map/realtime' => 'map#realtime'
  match 'map/historical' => 'map#historical'

  resources :reports do
    collection do
      get :stop
      get :gps
      get :distance
    end
  end

  resource :user_session
  resources :accounts, :drivers, :users, :places, :geofences, :alarms, :groups, :events

  resources :devices do
    collection do
      get :poll
    end
  end

  root :to => 'map#realtime'

end
