class AddPasscodeToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :passcode_digest, :string
  end
end
