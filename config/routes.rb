# frozen_string_literal: true

# rubocop:disable Style/Lambda
Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: :json do
      resources :posts
      resources :authors, only: [:show] do
        collection do
          get :check_login_state
          post :sign_in
          delete :sign_out
        end
      end
    end
  end
  root 'application#index'
  get '/*path', constraints: lambda { |req| req.format == :html }, to: 'application#index'
end
# rubocop:enable Style/Lambda
