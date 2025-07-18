class Reward < ApplicationRecord
  has_many :reward_redemptions
  has_many :children, through: :reward_redemptions
end
