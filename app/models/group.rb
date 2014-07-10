class Group < ActiveRecord::Base
  validates :name, :url, presence: true

  has_many :group_books
  has_many :books, through: :group_books
end
