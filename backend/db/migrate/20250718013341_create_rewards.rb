class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :name
      t.text :description
      t.integer :points_cost
      t.boolean :is_active

      t.timestamps
    end
  end
end
