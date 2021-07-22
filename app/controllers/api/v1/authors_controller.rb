# frozen_string_literal: true

# Author controller
module Api
  module V1
    # Manage author login/show
    class AuthorsController < BaseController
      before_action :check_session, except: %i[sign_in]

      def sign_in
        reset_session
        email = params[:email]
        password = params[:password]

        @author = Author.find_by!(email: email)

        if @author.valid_password?(password)
          session[:author_id] = @author.id
          return render 'show'
        end

        head :forbidden
      end

      def sign_out
        reset_session
        head :ok
      end

      def check_login_state
        render json: { **@current_author.as_json, loggedIn: true }
      end

      # # used to fetch data of an author
      # def show
      #   @author = Author.find(params[:id])
      #   render json: @author
      # end

      private

      def check_session
        return head :unauthorized unless @current_author
      end
    end
  end
end
