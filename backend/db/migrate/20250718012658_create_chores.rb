class CreateChores < ActiveRecord::Migration[8.0]
  def change
    create_table :chores do |t|
      t.string :title
      t.text :description
      t.integer :points
      t.integer :xp
      t.integer :frequency
      t.date :due_date
      t.integer :day_of_week
      t.json :days_of_week
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
