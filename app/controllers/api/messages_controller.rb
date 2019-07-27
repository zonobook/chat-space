class Api::MessagesController < ApplicationController
  def index
    @grouop = Group.find(params[:id])
    @messages = @group.messages.includes(:user).where('id > ?' params[:id])
  end
end