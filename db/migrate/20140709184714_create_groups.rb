class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.string :url
    end

    create_table :groups_books do |t|
      t.belongs_to :groups
      t.belongs_to :books
    end
  end
end
