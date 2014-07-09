class Book < ActiveRecord::Base
  after_initialize :init

  validates :name, :total_pages, :read_pages, presence: true
  validates :total_pages, :read_pages, numericality: { only_integer: true }
  validates :active, inclusion: [true, false]

  def init
    self.active      ||= false
    self.completed   ||= false
    self.read_pages  ||= 0
    self.total_pages ||= 0
  end
end
