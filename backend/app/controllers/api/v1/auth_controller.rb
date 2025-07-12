class Api::V1::AuthController < ApplicationController
  before_action :authorize_request, only: [:passcode]

  # POST /api/v1/register
  def register
    user = User.new(user_params)
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  # POST /api/v1/passcode
  def passcode
    if @current_user.authenticate_passcode(params[:passcode])
      render json: { success: true }
    else
      render json: { success: false, error: "Invalid passcode" }
    end
  end

  private

  def user_params
    params.permit(:email, :password, :passcode)
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
