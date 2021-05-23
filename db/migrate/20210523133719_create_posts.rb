class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.references :author, null: false, foreign_key: true
      t.string :tags, array: true
      t.string :category, default: 'general'

      t.index :title
      t.index :tags, using: 'gin'
      t.timestamps
    end
  end
end
