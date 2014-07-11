class Rename < ActiveRecord::Migration
  def change
    rename_table :groups_books, :group_books
    rename_column :group_books, :groups_id, :group_id
    rename_column :group_books, :books_id, :book_id
  end
end
