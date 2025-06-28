class Child < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :points, numericality: { greater_than_or_equal_to: 0 }

  after_initialize :set_defaults

  def set_defaults
    self.points ||= 0
  end
end
