class FamilyChannel < ApplicationCable::Channel
  def subscribed
    parent_id = params[:parent_id]

    # TODO: validate parent_id matches current_user.id

    stream_from "parent_#{parent_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
