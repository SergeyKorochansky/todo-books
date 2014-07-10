class GroupBook < ActiveRecord::Base
  belongs_to :book
  belongs_to :group
end