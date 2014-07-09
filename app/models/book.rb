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
  #
  # def progress
  #   if total_pages.zero?
  #     nil
  #   else
  #     ((read_pages.to_f / total_pages.to_f) * 100).to_i
  #   end
  # end
end
