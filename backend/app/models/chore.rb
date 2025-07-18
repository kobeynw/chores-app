class Chore < ApplicationRecord
  validate :validate_frequency_fields

  has_many :chore_assignments
  has_many :children, through: :chore_assignments

  enum frequency: {
    once: 0,
    daily: 1,
    weekly: 2,
    custom: 3
  }

  private

  def validate_frequency_fields
    case frequency.to_sym
    when :once
      errors.add(:due_date, "must be present") if due_date.blank?
    when :weekly
      errors.add(:day_of_week, "must be present") if day_of_week.blank?
      errors.add(:start_date, "must be present") if start_date.blank?
      errors.add(:end_date, "must be present") if end_date.blank?
    when :custom_days
      errors.add(:days_of_week, "must be present") if days_of_week.blank?
      errors.add(:start_date, "must be present") if start_date.blank?
      errors.add(:end_date, "must be present") if end_date.blank?
    end
  end
end
