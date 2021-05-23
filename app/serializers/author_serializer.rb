class AuthorSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :name, :picture_url
end
