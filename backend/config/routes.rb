Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  
  namespace :api do
    namespace :v1 do
      # AUTH ROUTES
      post "register", to: "auth#register"
      post "login", to: "auth#login"
      post "passcode", to: "auth#passcode"

      # USER ROUTES
      get "profile", to: "users#profile"

      # CHILD ROUTES
      resources :children

      # CHORE ROUTES
      resources :chores

      # WEBHOOK ROUTES
      mount ActionCable.server => "/cable"

      # TEST ROUTES
      get "/ping", to: "ping#index"
    end
  end
end
