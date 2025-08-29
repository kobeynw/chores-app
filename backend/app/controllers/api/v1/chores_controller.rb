class Api::V1::ChoresController < ApplicationController
  before_action :authorize_request

  # POST /api/v1/chores
  def create
    chore = Chore.new(chore_params)
    if chore.save
      render json: chore, status: :created
    else
      render json: { errors: chore.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def chore_params
    params.require(:chore).permit(
      :title,
      :description,
      :points,
      :xp,
      :frequency,
      :due_date,
      :day_of_week,
      :start_date,
      :end_date,
      :days_of_week => []
    )
  end

  def authorize_request
    header = request.headers['Authorization']
    token = header.split.last if header

    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { errors: 'Unauthorized' }, status: :unauthorized
    end
  end
end