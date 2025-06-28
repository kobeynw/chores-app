class User < ApplicationRecord
  has_secure_password
  has_secure_password :passcode

  has_many :children, dependent: :destroy

  validates :email, presence: true, uniqueness: true
end
