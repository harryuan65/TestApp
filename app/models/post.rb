class Post < ApplicationRecord
  belongs_to :author, optional: true

  default_scope {
    order(created_at: :desc)
  }
end
