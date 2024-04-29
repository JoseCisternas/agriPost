import produce from "immer";
import { createAppSlice } from "../../app/createAppSlice"
import { RootState} from "../../app/store";
import { fetchPosts, createPost, destroyPost, updatePost} from "./postAPI";
import { StringLiteral } from "@babel/types";

export enum Statuses 
{
    Initial = "Not Fetched",
    Loading = "Loading",
    UpToDate = "Up to Date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface PostState {
    id:number;
    post_name:string;
    post_description:string;
    created_at?:string;
    updated_at?:string;
}

export interface PostDeleteData {
    post: {
        post_id:number;
    }
}

export interface PostUpdateData{
    post_id:number;
    post:PostState;
}

export interface PostFormData{
    posts: 
    {
        id?:string;
        post_name:string;
        post_description:string;
    }
}

export interface PostsState{
    posts: PostState[];
    status: string;
}

const initialState: PostsState = {
    posts: [
        {
            id:0,
            post_name:"",
            post_description:"",
            created_at:"",
            updated_at:""
        }
    ],
    status: Statuses.Initial
}

export const postsSlice = createAppSlice({
    name:"posts",
    initialState,
    reducers: create => ({
        fetchPostsAsync: create.asyncThunk(
            async() => {
                const response = await fetchPosts();
                
                return response;
                }, 
                {
                    pending: state => {
                    state.status = Statuses.Loading;
                    },
                    fulfilled: (state, action) => {
                    state.status = Statuses.UpToDate;
                    console.log(action.payload);
                    state.posts = action.payload;
                    },
                    rejected: state => {
                    state.status = Statuses.Error;
                    },
                }
        ),
        destroyPostsAsync: create.asyncThunk(
            async(payload:PostDeleteData) => {
                const response = await destroyPost(payload);
                
                return response;
                }, 
                {
                    pending: state => {
                    state.status = Statuses.Loading;
                    },
                    fulfilled: (state, action) => {
                    state.status = Statuses.UpToDate;
                    console.log(action.payload);
                    state.posts = action.payload;
                    },
                    rejected: state => {
                    state.status = Statuses.Error;
                    },
                }
        ),
        updatePostAsync: create.asyncThunk(
            async(payload:PostUpdateData) => {
                const response = await updatePost(payload);
                
                return response;
                }, 
                {
                    pending: state => {
                    state.status = Statuses.Loading;
                    },
                    fulfilled: (state, action) => {
                    state.status = Statuses.UpToDate;
                    console.log(action.payload);
                    const index = state.posts.findIndex(
                       post => post.id === action.payload.id 
                    );
                    state.posts[index] = action.payload;

                    },
                    rejected: state => {
                    state.status = Statuses.Error;
                    },
                }
        ),
        createPostAsync:create.asyncThunk(
            async (payload:PostFormData) =>{
                const response = await createPost(payload);
                return response;
            }, 
            {
                pending: state => {
                state.status = Statuses.Loading;
                },
                fulfilled: (state, action) => {
                state.status = Statuses.UpToDate;
                state.posts.push( action.payload);
                },
                rejected: state => {
                state.status = Statuses.Error;
                },
            }
        )
    }),
    
})

export const {fetchPostsAsync, createPostAsync, destroyPostsAsync, updatePostAsync} = postsSlice.actions;

export const selectPosts = (state:RootState) =>state.posts.posts;

export const selectStatus = (state:RootState) => state.posts.status;

export default postsSlice.reducer;
