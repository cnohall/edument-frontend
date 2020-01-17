import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";


export default function AddPaths () {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = "You need to write something";  
  const [message, setmessage] = React.useState('');
  
  const onSubmit = (data) => {
    const newPath = data.newPath;
    axios.post('https://edument-backend.herokuapp.com/path/add', {path: newPath})
    .then(res => {
      setmessage ("You've successfully uploaded a new path: " + data.newPath);
      console.log(message);
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="tabWindow">
    <div id="tabinfo">
    <h2 className="logo">Add a path</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Pathname..." name="newPath" ref={register ({required:true})}/>
        <input className="button" type="submit" value="Add"/> 
        {errors.newPath && <p className="error"> {errorMessage}</p>}
        {message && <p className="error"> {message}</p>}
      </form>
    </div>
    </div>
  )
}

