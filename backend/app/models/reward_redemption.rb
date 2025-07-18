class RewardRedemption < ApplicationRecord
  belongs_to :child
  belongs_to :reward
end
