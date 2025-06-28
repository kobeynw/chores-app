# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

parent = User.create!(
  email: "parent@example.com",
  password: "RandomWords123",
  passcode: "1234"
)

parent.children.create!([
  { name: "Mary", age: 8, avatar_url: "🐱", points: 0 },
  { name: "John", age: 10, avatar_url: "🦊", points: 35 }
])
