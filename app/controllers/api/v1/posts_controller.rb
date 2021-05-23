# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApiController
      def index
        limit = params[:limit] || 50
        offset = params[:offset] || 0

        @posts = Post.includes(:author).limit(limit).offset(offset)
        render json: PostsSerializer.new(@posts).serializable_hash
      end
    end
  end
end
