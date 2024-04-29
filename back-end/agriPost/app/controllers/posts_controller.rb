class PostsController < ApplicationController


    def index
        posts = Post.all
        render json: posts
    end  
    def show
        posts = Post.find(params[:id])
        render json: posts
    end  
    def create
        posts = Post.create(posts_params)
        render json: posts
    end  
    def update
        posts = Post.find_by(id: params[:id])
        posts.update(posts_params)
        render json: posts
    end  
    def destroy
        posts = Post.find_by(id: params[:id])
        posts.destroy
        posts = Post.all
        render json: posts
    end  
    private  def posts_params
        params.require(:post).permit(:id, :post_name, :post_description)
    end
end
