class CreateRewardRedemptions < ActiveRecord::Migration[8.0]
  def change
    create_table :reward_redemptions do |t|
      t.references :child, null: false, foreign_key: true
      t.references :reward, null: false, foreign_key: true
      t.datetime :redeemed_at
      t.boolean :approved, default: false

      t.timestamps
    end
  end
end
