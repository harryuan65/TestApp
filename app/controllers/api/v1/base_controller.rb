# frozen_string_literal: true

# Api only controller base
module Api
  module V1
    # Root of all API base controllers
    class BaseController < ActionController::API
      include ActionController::RequestForgeryProtection
      # protect_from_forgery with: :exception
      # rescue_from ActionController::InvalidAuthenticityToken do # |e|
      #   reset_session
      # end

      # before_action :check_csrf #  ActionController::RequestForgeryProtection already protects post apis no need manual checking
      before_action :set_author
      after_action :set_csrf_token

      protected

      def check_csrf
        # puts request.headers['X-CSRF-TOKEN'] == form_authenticity_token # false!!
        # puts verified_request?
        puts valid_authenticity_token?(session, request.headers['X-CSRF-TOKEN'])
      end

      def set_csrf_token
        response.set_header('X-CSRF-TOKEN', form_authenticity_token)
      end

      def set_author
        puts session.to_h
        @current_author = (author_id = session[:author_id]) && Author.find(author_id)
      end
    end
  end
end
