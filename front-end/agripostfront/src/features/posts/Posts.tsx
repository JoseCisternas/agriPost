import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks';
import { Statuses, fetchPostsAsync, selectPosts, selectStatus, updatePostAsync} from './postsSlice';
import { useDispatch } from 'react-redux';
import { use } from 'chai';
import Post from './Post';
import PostForm from './PostForm';


function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch();

  const [postToEdit,setPostToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch])

  function toggleEditForm(post_id?:number){
    if (postToEdit === post_id) {
      setPostToEdit(0);
    } else {
      setPostToEdit(post_id as number)
    }
  }

  function submitEdit(formData:any){
    dispatch(updatePostAsync(formData));
    toggleEditForm();
  }

  let contents, postContent, postsArr; 

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    
    if (posts.length > 0)
  
      postContent = posts.map( function(post) {
        return (
          <Post
            dispatch= {dispatch}
            post = {post}
            toggleEditForm = {()=> toggleEditForm(post.id)}
            postToEdit={postToEdit}
            submitEdit = {submitEdit}
            />
          
        )
    
         
      }) 
     
    contents = 
    (
      
    <div>
      <PostForm/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>  
        {postContent}     
        </tbody>
        </table> 
    </div>)
  }

  return (<div><h1>Posts</h1>{contents}</div>)
  
}

export default Posts;