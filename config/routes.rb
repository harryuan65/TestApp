# frozen_string_literal: true

# rubocop:disable Style/Lambda
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, format: :json
    end
  end
  root 'application#index'
  get '/*path', constraints: lambda { |req| req.format == :html }, to: 'application#index'
end
# rubocop:enable Style/Lambda
