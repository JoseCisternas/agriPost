import React, {useState} from 'react'

function SearchBar(props:any) {
    const[postToSearch,setPostToSearch] = useState(props.postToSearch)
    function submitHandler(e){
        e.preventDefault();
        props.setPostToSearch(postToSearch)
    }


  return (
    <div>
        <div><input 
            type="text"
            className='form-control text-start' 
            value={postToSearch} 
            onChange={(e)=>setPostToSearch(e.target.value)}/>
        </div>
        <button
            type="submit"
            onClick={(e)=> submitHandler(e)}>Search
      </button>  
    </div>
  )
}

export default SearchBar