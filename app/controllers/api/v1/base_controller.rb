# frozen_string_literal: true

# Api only controller base
module Api
  module V1
    class BaseController < ActionController::API
      include ActionController::RequestForgeryProtection
      protect_from_forgery with: :exception
      before_action :check_csrf
      after_action :set_csrf_token

      protected

      def check_csrf
        # puts "Auth: #{request.headers['X-CSRF-TOKEN'] == form_authenticity_token}" if request.method != "GET"
        # puts request.cookies['X-CSRF-TOKEN']
        puts request.headers['X-CSRF-TOKEN']
      end

      def set_csrf_token
        response.set_header('X-CSRF-TOKEN', form_authenticity_token)
        # response.set_cookie('X-CSRF-TOKEN', form_authenticity_token)
      end
    end
  end
end
