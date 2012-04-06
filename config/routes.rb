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

  resource :profile

  resources :accounts do
    collection do
      get :current
      post :current
    end
  end

  resources :places, :alarms, :speed_alarms, :geofence_alarms, :devices, :schedules, :alerts

  resources :users do
    collection do
      post :change_account
    end
  end

  resources :events do
    collection do
      get :realtime
    end
  end

  match 'account' => 'accounts#show', :as => :account
  match 'platform' => 'pages#platform', :as => :platform
  match 'competition' => 'pages#competition', :as => :competition
  match 'company' => 'pages#company', :as => :company
  match 'login'  => 'user_sessions#new', :as => :login
  match 'logout' => 'user_sessions#destroy', :as => :logout
  root :to => 'map#realtime'

end
