# frozen_string_literal: true

module Api
  module V1
    # posts api
    class PostsController < BaseController
      def index
        @posts = PostService.get_posts(tag: params[:tag], limit: params[:limit], offset: params[:offset])
      end

      def show
        @post = PostService.get_post(id: params[:id])
      end
    end
  end
end
