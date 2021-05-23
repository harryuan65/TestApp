# frozen_string_literal: true

# Create Authors
class CreateAuthors < ActiveRecord::Migration[6.1]
  def change
    create_table :authors do |t|
      t.string :email, null: false
      t.string :password_hash, null: false
      t.string :name, null: false
      t.string :picture
      t.integer :role, null: false, default: 0
      t.index :email, unique: true
      t.timestamps
    end
  end
end
