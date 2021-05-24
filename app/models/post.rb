class Post < ApplicationRecord
  belongs_to :author

  default_scope {
    order(created_at: :desc)
  }
end
