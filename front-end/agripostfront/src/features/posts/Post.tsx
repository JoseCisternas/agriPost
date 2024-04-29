import React, {useEffect, useState} from 'react'
import ButtonGroup from './ButtonGroup'


function Post(props:any) {
  const [id,setId] = useState(props.post.id);
  const [name,setName] = useState(props.post.post_name);
  const [description,setDescription] = useState(props.post.post_description);
  const [isEditing, setIsEditing] = useState(props.postToEdit ===props.post.id)
//  const [body, setBody] = useState(props.post.post_description);

useEffect(() =>{
  setIsEditing(props.postToEdit === props.post.id)
}, [props.postToEdit, props.post.id])

  function submitHandler(e:any){
    e.preventDefault();
    const formData = {
      post: {
        id: props.post.id,
        post_name: name,
        post_description: description,
      }
    }
    props.submitEdit(formData);
    resetState();
  }

  function resetState(){
    setName(props.post.post_name);
    setDescription(props.post.post_description);
  }


  const nameElement = props.post.post_name;
  const editableName = <input 
    type="text"
    className='form-control text-start' 
    value={name} 
    onChange={(e)=>setName(e.target.value)}/>;


  const descriptionElement = props.post.post_description;
  const editableDescription = <textarea
    className='form-constrol text-start'
    value ={description}
    onChange={(e)=> setDescription(e.target.value)}/> ;


  const buttonGroup =  <ButtonGroup
  post_id={id}
  dispatch = {props.dispatch}
  toggleEditForm={props.toggleEditForm}
  />;
  const submitButton = <button
    type='submit'
    className='form-control'
    onClick={(e)=> submitHandler(e)}>Submit</button>;
  return (
    <tr>
    <th scope="row">{id}</th>
      <td>{isEditing? editableName : nameElement}</td>
      <td>{isEditing? editableDescription : descriptionElement}</td>
      <td>{isEditing? submitButton : buttonGroup}</td>
    </tr>
  )
}

export default Post