class AddCompleteToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :complete, :boolean
  end
end
