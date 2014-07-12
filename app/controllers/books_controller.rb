class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  def index
    @books = Book.all
  end

  def show
  end

  def create
    @book = Book.new(book_params)
    respond_to do |format|
      if @book.update(book_params)
        format.json { render :show }
      else
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @book.update(book_params.except(:groups))
        @book.group_ids =  book_params[:groups]
        format.json { render :show }
      else
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @book.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_book
    @book = Book.find(book_params[:id])
  end

  def book_params
    params.permit(:id, :name, :active, :read_pages, :total_pages, groups: [])
  end
end
