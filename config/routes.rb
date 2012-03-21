Gowane::Application.routes.draw do

  match 'help/:section' => 'help#index'
  match 'map/realtime' => 'map#realtime'
  match 'map/historical' => 'map#historical'

  resources :reports do
    collection do
      get :stop
      get :speed
      get :events
      get :distance
    end
  end

  resource :user_session
  resources :accounts, :places, :alarms, :speed_alarms, :geofence_alarms, :events, :schedules, :alerts

  resources :users do
    collection do
      post :change_account
    end
  end

  resources :devices do
    collection do
      get :poll
    end
  end

  match 'login'  => 'user_sessions#new', :as => :login
  match 'logout' => 'user_sessions#destroy', :as => :logout
  root :to => 'map#realtime'

end
