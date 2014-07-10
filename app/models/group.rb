class Group < ActiveRecord::Base
  has_many :group_books
  has_many :books, through: :group_books

  validates :name, :url, presence: true
end
