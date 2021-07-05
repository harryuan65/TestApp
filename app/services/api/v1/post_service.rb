# frozen_string_literal: true

module Api
  module V1
    # Post api services
    class PostService
      class << self
        def get_posts(tag: nil, limit: 10, offset: 0)
          posts = Post.includes(:author).limit(limit).offset(offset)
          posts = posts.where("'#{tag}' = ANY (tags)") if tag.present? && tag != 'latest'
          posts
        end

        def get_post(id:)
          Post.includes(:author).find(id)
        end
      end
    end
  end
end
