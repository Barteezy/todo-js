class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos.to_json
  end

  def create
    p params
    @todo = Todo.new
    @todo.name = params[:name]
    @todo.save!
    render json: @todo.to_json
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.complete = true
    if @todo.save
      render json: @todo.to_json
    else
      head :unprocessable_entity
    end
  end


  def destroy
    if Todo.destroy(params[:id])
      head :no_content
    else
      head :unprocessable_entity
    end
  end
end