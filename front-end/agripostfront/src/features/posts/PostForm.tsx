import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {createPostAsync} from './postsSlice'
function PostForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description,setDescription] = useState('');

  function submitHandler(e){
    e.preventDefault();
    const formData = {
      posts: {
        post_name:name,
        post_description:description,
      }
    }
    dispatch(createPostAsync(formData));
    resetState();

  }

  function resetState() {
    setName('');
    setDescription('');
  }

  return (
    <div>
      <h1>PostForm</h1>
    <form>
      <input 
        type = "text"
        className = "form-control text-start"
        name = "name"
        value = {name}
        onChange = {(e) => setName(e.target.value)}
        />

      <textarea 
        className = "form-control text-start"
        name = "description"
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}
        />
      <button
        type="submit"
        onClick={(e)=> submitHandler(e)}>Submit
      </button>  
    </form>
    </div>

  )
}

export default PostForm