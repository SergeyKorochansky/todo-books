class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy]

  def index
    @groups = Group.all
  end

  def show
  end

  def create
    @group = Group.new(group_params)
    respond_to do |format|
      if @group.update(group_params)
        format.json { render :show }
      else
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @group.update(group_params)
        format.json { render :show }
      else
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @group.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_group
    @group = Group.find(group_params[:id])
  end

  def group_params
    params.permit(:id, :name, :url)
  end
end
