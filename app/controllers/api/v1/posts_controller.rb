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

      def update
        @post = PostService.update_post(id: params[:id], title: params[:title], content: params[:content])
        render 'show'
        # render jb: @post
      end
    end
  end
end
