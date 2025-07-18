class AddLevelAndXpToChildren < ActiveRecord::Migration[8.0]
  def change
    add_column :children, :level, :integer
    add_column :children, :xp, :integer
  end
end
