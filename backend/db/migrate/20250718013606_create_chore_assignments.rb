class CreateChoreAssignments < ActiveRecord::Migration[8.0]
  def change
    create_table :chore_assignments do |t|
      t.references :chore, null: false, foreign_key: true
      t.references :child, null: false, foreign_key: true
      t.datetime :completed_at
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
