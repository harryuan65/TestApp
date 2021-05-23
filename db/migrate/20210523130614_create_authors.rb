# frozen_string_literal: true

# Create Authors
class CreateAuthors < ActiveRecord::Migration[6.1]
  def change
    create_table :authors do |t|
      t.string :email, null: false, unique: true
      t.string :password_hash, null: false
      t.string :name, null: false
      t.string :picture
      t.integer :role, null: false, default: 0

      t.timestamps
    end
  end
end
