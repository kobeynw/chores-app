class Api::V1::ChildrenController < ApplicationController
  before_action :authorize_request
  before_action :set_child, only: [:show, :update, :destroy]

  # GET /api/v1/children
  def index
    @children = @current_user.children
    render json: @children
  end

  # POST /api/v1/children
  def create
    @child = @current_user.children.build(child_params)
    if @child.save
      render json: @child, status: :created
    else
      render json: { errors: @child.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/children/:id
  def show
    render json: @child
  end

  # PUT /api/v1/children/:id
  def update
    if @child.update(child_params)
      render json: @child
    else
      render json: { errors: @child.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/children/:id
  def destroy
    @child.destroy
    render json: { message: "Child profile successfully deleted." }, status: :ok
  end

  private

  def set_child
    @child = @current_user.children.find(params[:id])
  end

  def child_params
    params.require(:child).permit(:name, :avatar_url, :age)
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