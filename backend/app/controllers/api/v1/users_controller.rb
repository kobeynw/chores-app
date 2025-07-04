class Api::V1::UsersController < ApplicationController
  before_action :authorize_request

  # GET /api/v1/profile
  def profile
    render json: { user: @current_user }, status: :ok
  end

  private

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