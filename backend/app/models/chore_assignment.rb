class ChoreAssignment < ApplicationRecord
  belongs_to :chore
  belongs_to :child

  enum status: {
    assigned: 0,
    completed: 1,
    overdue: 2
  }
end
