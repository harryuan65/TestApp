class PostsSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :tags
  belongs_to :author, serializer: AuthorSerializer
  # avoid n+1 problem?
  # belongs_to :author do |post|
  #   return {} unless post.author.loaded?

  #   AuthorSerializer.new(post.author)
  # end
end
