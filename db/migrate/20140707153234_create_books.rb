class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :name
      t.integer :total_pages
      t.integer :read_pages
      t.boolean :completed

      t.timestamps
    end
  end
end
