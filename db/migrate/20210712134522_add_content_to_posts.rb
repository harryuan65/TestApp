# frozen_string_literal: true

# was considering adding action text, but decided no need for that
class AddContentToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :content, :text, default: '', null: false
  end
end
