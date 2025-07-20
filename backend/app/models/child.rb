class Child < ApplicationRecord
  belongs_to :user

  has_many :chore_assignments
  has_many :children, through: :chore_assignments
  has_many :reward_redemptions
  has_many :rewards, through: :reward_redemptions

  validates :name, presence: true
  validates :points, numericality: { greater_than_or_equal_to: 0 }

  after_initialize :set_defaults

  def set_defaults
    self.points ||= 0
    self.level ||= 1
    self.xp ||= 0
  end
end
