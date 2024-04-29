import { PostDeleteData, PostFormData, PostsState, PostUpdateData } from "./postsSlice";
const API_URL = "http://localhost:3000/posts";

export async function fetchPosts(){
    return fetch(`${API_URL}.json`,{
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        },
    })
    .then((response)=> response.json())
    .catch((error) => {
        console.log("Error: ", error);
        return {} as PostsState;
    });
    
}

export async function createPost(payload:PostFormData){
    const post = payload.posts;
    return fetch(`${API_URL}.json`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            post
        })
    }) 
        .then((response)=> response.json())
        .catch((error) => {
            console.log("Error: ", error);
            return {} as PostsState;
        });
    
}

export async function updatePost(payload:PostUpdateData){
    const post = payload.post;
    return fetch(`${API_URL}/${post.id}.json`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            post,
        })
    }) 
        .then((response)=> response.json())
        .catch((error) => {
            console.log("Error: ", error);
            return {} as PostsState;
        });
}

export async function destroyPost(payload:PostDeleteData){
    const post = payload.post;
    return fetch(`${API_URL}/${post.post_id}.json`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            post
        })
    }) 
        .then((response)=> response.json())
        .catch((error) => {
            console.log("Error: ", error);
            return {} as PostsState;
        });
}